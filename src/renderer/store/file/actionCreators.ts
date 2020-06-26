import logger from "electron-log";
import { Action } from "redux";

import { disableMenuItems, enableMenuItems } from "../../electron/ipcRenderer/senders";
import createBackup from "../../files/diary/backupFile";
import { getDiaryFilePath, getMetadata } from "../../files/diary/diaryFile";
import { hashPassword } from "../../files/diary/hashPassword";
import { performMigrations } from "../../files/diary/migrations";
import {
	deleteFile,
	fileExists,
	readEncryptedFile,
	writeEncryptedFile,
} from "../../files/fileAccess";
import mergeEntries from "../../files/import/mergeEntries";
import { Entries, MiniDiaryJson } from "../../types";
import { createDate } from "../../utils/dateFormat";
import { translations } from "../../utils/i18n";
import { addIndexDoc, createIndex, removeIndexDoc, updateIndexDoc } from "../../utils/searchIndex";
import { setEntrySelected } from "../diary/actionCreators";
import { ThunkActionT } from "../store";
import {
	CLEAR_FILE_STATE,
	ClearFileStateAction,
	DECRYPT_ERROR,
	DECRYPT_IN_PROGRESS,
	DECRYPT_SUCCESS,
	ENCRYPT_ERROR,
	ENCRYPT_IN_PROGRESS,
	ENCRYPT_SUCCESS,
	SET_FILE_EXISTS,
	SET_HASHED_PASSWORD,
	SetDecryptErrorAction,
	SetDecryptInProgressAction,
	SetDecryptSuccessAction,
	SetEncryptErrorAction,
	SetEncryptInProgressAction,
	SetEncryptSuccessAction,
	SetFileExistsAction,
	SetHashedPasswordAction,
} from "./types";

// Action creators

function clearFileState(): ClearFileStateAction {
	return {
		type: CLEAR_FILE_STATE,
	};
}

function setDecryptInProgress(): SetDecryptInProgressAction {
	return {
		type: DECRYPT_IN_PROGRESS,
	};
}

function setDecryptError(decryptErrorMsg: string): SetDecryptErrorAction {
	return {
		type: DECRYPT_ERROR,
		payload: {
			decryptErrorMsg,
		},
	};
}

function setDecryptSuccess(entries: Entries): SetDecryptSuccessAction {
	return {
		type: DECRYPT_SUCCESS,
		payload: {
			entries,
		},
	};
}

function setEncryptInProgress(): SetEncryptInProgressAction {
	return {
		type: ENCRYPT_IN_PROGRESS,
	};
}

function setEncryptError(encryptErrorMsg: string): SetEncryptErrorAction {
	return {
		type: ENCRYPT_ERROR,
		payload: {
			encryptErrorMsg,
		},
	};
}

function setEncryptSuccess(entries: Entries): SetEncryptSuccessAction {
	return {
		type: ENCRYPT_SUCCESS,
		payload: {
			entries,
		},
	};
}

function setFileExists(exists: boolean): SetFileExistsAction {
	return {
		type: SET_FILE_EXISTS,
		payload: {
			fileExists: exists,
		},
	};
}

function setHashedPassword(hashedPassword: string): SetHashedPasswordAction {
	return {
		type: SET_HASHED_PASSWORD,
		payload: {
			hashedPassword,
		},
	};
}

// Thunks

/**
 * Test whether a diary file exists at the path specified in the preferences
 */
export const testFileExists = (): ThunkActionT => (dispatch): void => {
	const filePath = getDiaryFilePath();
	dispatch(setFileExists(fileExists(filePath)));
};

/**
 * Lock the diary: Remove password and diary entries from state
 */
export const lock = (): ThunkActionT => (dispatch): void => {
	dispatch(clearFileState());
	disableMenuItems();
};

/**
 * Read diary entries from disk
 */
export const decryptFile = (password: string): ThunkActionT => (dispatch): void => {
	const filePath = getDiaryFilePath();
	dispatch(setDecryptInProgress());
	const hashedPassword = hashPassword(password);
	try {
		const fileContent = readEncryptedFile(filePath, hashedPassword);
		let data: MiniDiaryJson = JSON.parse(fileContent);

		// On success: Save password
		dispatch(setHashedPassword(hashedPassword));

		// Perform data migrations between app updates if necessary
		data = performMigrations(data);

		// Load diary entries and save password
		const { entries } = data;
		dispatch(setDecryptSuccess(entries));
		createIndex(entries);
		enableMenuItems();
		createBackup();
	} catch (err) {
		// Error reading diary file
		let errorMsg;
		if (err.message.endsWith("BAD_DECRYPT")) {
			errorMsg = translations["wrong-password"];
		} else {
			errorMsg = `${translations["decryption-error"]}: ${err.message}`;
		}
		logger.error("Error decrypting diary file: ", err);
		dispatch(setDecryptError(errorMsg));
	}
};

/**
 * Create new encrypted diary file and index with the provided password
 */
export const createEncryptedFile = (password: string): ThunkActionT => (dispatch): void => {
	const entries = {};
	const filePath = getDiaryFilePath();
	const content: MiniDiaryJson = {
		metadata: getMetadata(),
		entries,
	};
	dispatch(setEncryptInProgress());
	const hashedPassword = hashPassword(password);
	try {
		writeEncryptedFile(filePath, hashedPassword, JSON.stringify(content));
		dispatch(setEncryptSuccess(entries));
		dispatch(setHashedPassword(hashedPassword));
		createIndex(entries);
		enableMenuItems();
	} catch (err) {
		logger.error("Error creating encrypted diary file: ", err);
		dispatch(setEncryptError(err.message));
	}
};

/**
 * Write diary entries to disk
 */
const writeEntriesEncrypted = (entries: Entries, hashedPassword: string): ThunkActionT => (
	dispatch,
): void => {
	const filePath = getDiaryFilePath();
	const fileContent: MiniDiaryJson = {
		metadata: getMetadata(),
		entries,
	};
	dispatch(setEncryptInProgress());
	try {
		writeEncryptedFile(filePath, hashedPassword, JSON.stringify(fileContent));
		dispatch(setEncryptSuccess(entries));
	} catch (err) {
		logger.error("Error updating encrypted diary file: ", err);
		dispatch(setEncryptError(err.message));
	}
};

/**
 * Delete the diary file in the currently selected directory
 */
export const resetDiary = (): ThunkActionT => (dispatch): void => {
	const filePath = getDiaryFilePath();
	deleteFile(filePath);
	dispatch(lock());
};

/**
 * Write diary entries to disk with a new password. Update the password in the store
 */
export const updatePassword = (newPassword: string): ThunkActionT => (dispatch, getState): void => {
	const { entries } = getState().file;
	const hashedPassword = hashPassword(newPassword);
	dispatch(writeEntriesEncrypted(entries, hashedPassword));
	dispatch(setHashedPassword(hashedPassword));
};

/**
 * Update the diary entry in the state. Remove the entry if it is empty. Then write the diary to the
 * encrypted diary file and update the index
 */
export const updateEntry = (
	entryDate: string,
	title: string,
	text: string,
	id: string,
): ThunkActionT => (dispatch, getState): void => {
	const { entries, hashedPassword } = getState().file;
	const entriesUpdated = { ...entries };

	// Abort if password has been deleted from state (e.g. when the diary has been locked)
	if (!hashedPassword) {
		return;
	}

	const entryToBeUpdated = entries[entryDate] && entries[entryDate].find(e => e.id === id);
	let deferred = null;
	if (entryToBeUpdated) {
		// Updating existing entry
		if (title === "" && text === "") {
			// deleting
			if (entriesUpdated[entryDate].length === 1) {
				delete entriesUpdated[entryDate];
			} else {
				entriesUpdated[entryDate].splice(entriesUpdated[entryDate].indexOf(entryToBeUpdated), 1);
			}
			removeIndexDoc(entryDate, entryToBeUpdated);
		} else {
			const entryUpdated = {
				dateUpdated: createDate().toString(),
				title,
				text,
				id,
			};
			entriesUpdated[entryDate][entriesUpdated[entryDate].indexOf(entryToBeUpdated)] = entryUpdated;
			updateIndexDoc(entryDate, entryToBeUpdated, entryUpdated);
		}
	} else {
		// Entry doesn't exist yet
		if (title === "" && text === "") {
			return;
		}

		const entryAdded = {
			dateUpdated: createDate().toString(),
			title,
			text,
			id,
		};

		if (entriesUpdated[entryDate]) {
			entriesUpdated[entryDate].push(entryAdded);
		} else {
			entriesUpdated[entryDate] = [entryAdded];
		}
		addIndexDoc(entryDate, entryAdded);
		deferred = (): Action => setEntrySelected(entryAdded.id);
	}

	// Write entries to disk
	dispatch(writeEntriesEncrypted(entriesUpdated, hashedPassword));
	if (deferred) {
		dispatch(deferred());
	}
};

/**
 * Merge the provided diary JSON with the one in the Redux state. For each entry, use the new one if
 * none exists yet. Otherwise, append the new title and text to the existing ones
 */
export const mergeUpdateFile = (newEntries: Entries): ThunkActionT => (
	dispatch,
	getState,
): void => {
	const { entries, hashedPassword } = getState().file;
	const entriesUpdated = { ...entries };

	Object.entries(newEntries).forEach(([indexDate, newEntriesOfTheDay]): void => {
		if (indexDate in entriesUpdated) {
			// Entry exists -> merge
			const oldEntries = entriesUpdated[indexDate];
			entriesUpdated[indexDate] = mergeEntries(oldEntries, newEntriesOfTheDay);
		} else {
			// Entry does not exist yet -> add
			entriesUpdated[indexDate] = newEntriesOfTheDay;
		}
	});
	dispatch(writeEntriesEncrypted(entriesUpdated, hashedPassword));
	createIndex(entriesUpdated); // Recreate index
};
