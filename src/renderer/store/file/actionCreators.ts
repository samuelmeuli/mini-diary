import { disableMenuItems, enableMenuItems } from "../../electron/ipcRenderer/senders";
import { getDiaryFilePath, getMetadata } from "../../files/diary/diaryFile";
import { hashPassword } from "../../files/diary/hashPassword";
import { fileExists, readEncryptedFile, writeEncryptedFile } from "../../files/fileAccess";
import { translations } from "../../utils/i18n";
import { createIndex, createOrUpdateIndexDoc, deleteIndexDoc } from "../../utils/searchIndex";
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
export const testFileExists = (): ThunkActionT => dispatch => {
	const filePath = getDiaryFilePath();
	dispatch(setFileExists(fileExists(filePath)));
};

/**
 * Read diary entries from disk
 */
export const decryptFile = (password: string): ThunkActionT => dispatch => {
	const filePath = getDiaryFilePath();
	dispatch(setDecryptInProgress());
	const hashedPassword = hashPassword(password);
	try {
		const fileContent = readEncryptedFile(filePath, hashedPassword);
		const { entries } = JSON.parse(fileContent);
		// On success, load diary entries and save password
		dispatch(setDecryptSuccess(entries));
		dispatch(setHashedPassword(hashedPassword));
		createIndex(entries);
		enableMenuItems();
	} catch (err) {
		// Error reading diary file
		let errorMsg;
		if (err.message.endsWith("BAD_DECRYPT")) {
			errorMsg = translations["wrong-password"];
		} else {
			errorMsg = `${translations["decryption-error"]}: ${err.message}`;
		}
		dispatch(setDecryptError(errorMsg));
	}
};

/**
 * Create new encrypted diary file and index with the provided password
 */
export const createEncryptedFile = (password: string): ThunkActionT => dispatch => {
	const entries = {};
	const filePath = getDiaryFilePath();
	const content = {
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
		console.error(err);
		dispatch(setEncryptError(err.message));
	}
};

/**
 * Write diary entries to disk
 */
const writeEntriesEncrypted = (
	entries: Entries,
	hashedPassword: string,
): ThunkActionT => dispatch => {
	const filePath = getDiaryFilePath();
	const fileContent = {
		metadata: getMetadata(),
		entries,
	};
	dispatch(setEncryptInProgress());
	try {
		writeEncryptedFile(filePath, hashedPassword, JSON.stringify(fileContent));
		dispatch(setEncryptSuccess(entries));
	} catch (err) {
		console.error(err);
		dispatch(setEncryptError(err.message));
	}
};

/**
 * Write diary entries to disk with a new password. Update the password in the store
 */
export const updatePassword = (newPassword: string): ThunkActionT => (dispatch, getState) => {
	const { entries } = getState().file;
	const hashedPassword = hashPassword(newPassword);
	dispatch(writeEntriesEncrypted(entries, hashedPassword));
	dispatch(setHashedPassword(hashedPassword));
};

/**
 * Update the diary entry in the state. Remove the entry if it is empty. Then write the diary to the
 * encrypted diary file and update the index
 */
export const updateEntry = (entryDate: IndexDate, title: string, text: string): ThunkActionT => (
	dispatch,
	getState,
) => {
	const { entries, hashedPassword } = getState().file;
	const entriesUpdated = { ...entries };

	// Abort if password has been deleted from state (e.g. when the diary has been locked)
	if (!hashedPassword) {
		return;
	}

	if (title === "" && text === "") {
		// Empty entry
		if (entryDate in entries) {
			// If existing entry: Delete entry from file and index
			delete entriesUpdated[entryDate];
			deleteIndexDoc(entryDate);
		}
	} else if (
		!(entryDate in entries) || // Entry doesn't exist yet
		title !== entries[entryDate].title || // Title has changed
		text !== entries[entryDate].text // Text has changed
	) {
		// Non-empty and new/updated entry: Write to file and add to index
		const entryUpdated = {
			dateUpdated: new Date().toString(),
			title,
			text,
		};
		entriesUpdated[entryDate] = entryUpdated;
		createOrUpdateIndexDoc(entryDate, entryUpdated);
	} else {
		return;
	}
	// Write entries to disk
	dispatch(writeEntriesEncrypted(entriesUpdated, hashedPassword));
};

/**
 * Merge the provided diary JSON with the one in the Redux state. For each entry, use the new one if
 * none exists yet. Otherwise, append the new title and text to the existing ones
 */
export const mergeUpdateFile = (newEntries: Entries): ThunkActionT => (dispatch, getState) => {
	// Check whether newEntries is an object
	if (typeof newEntries !== "object" || newEntries === null) {
		throw Error("Entries are not an object");
	}

	const { entries, hashedPassword } = getState().file;
	const entriesUpdated = { ...entries };

	Object.entries(newEntries).forEach(([indexDate, newEntry]) => {
		let entryUpdated;
		if (indexDate in entriesUpdated) {
			// Entry exists -> merge
			const oldEntry = entriesUpdated[indexDate];
			entryUpdated = {
				dateUpdated: newEntry.dateUpdated,
				title: `${oldEntry.title} | ${newEntry.title}`,
				text: `${oldEntry.text}\n\n----------\n\n${newEntry.text}`,
			};
		} else {
			// Entry does not exist yet -> add
			entryUpdated = newEntry;
		}
		entriesUpdated[indexDate] = entryUpdated;
	});
	dispatch(writeEntriesEncrypted(entriesUpdated, hashedPassword));
	createIndex(entriesUpdated); // Recreate index
};

/**
 * Lock the diary: Remove password and diary entries from state
 */
export const lock = (): ThunkActionT => dispatch => {
	dispatch(clearFileState());
	disableMenuItems();
};
