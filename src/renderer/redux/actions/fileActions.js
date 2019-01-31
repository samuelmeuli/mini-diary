import { disableMenuItems, enableMenuItems } from '../../electron/ipcRenderer/senders';
import { fileExists, readEncryptedFile, writeEncryptedFile } from '../../helpers/fileAccess';
import { hashPassword } from '../../helpers/hashPassword';
import { getDiaryFilePath, getMetadata } from '../../helpers/diaryFile';
import { createIndex, createOrUpdateIndexDoc, deleteIndexDoc } from '../../helpers/searchIndex';

// Action creators

function clearFileState() {
	return {
		type: 'CLEAR_FILE_STATE'
	};
}

function setDecryptInProgress() {
	return {
		type: 'DECRYPT_IN_PROGRESS'
	};
}

function setDecryptError(decryptErrorMsg) {
	return {
		type: 'DECRYPT_ERROR',
		payload: {
			decryptErrorMsg
		}
	};
}

function setDecryptSuccess(entries) {
	return {
		type: 'DECRYPT_SUCCESS',
		payload: {
			entries
		}
	};
}

function setEncryptInProgress() {
	return {
		type: 'ENCRYPT_IN_PROGRESS'
	};
}

function setEncryptError() {
	return {
		type: 'ENCRYPT_ERROR'
	};
}

function setEncryptSuccess(entries) {
	return {
		type: 'ENCRYPT_SUCCESS',
		payload: {
			entries
		}
	};
}

function setFileExists(exists) {
	return {
		type: 'SET_FILE_EXISTS',
		payload: {
			fileExists: exists
		}
	};
}

function setHashedPassword(hashedPassword) {
	return {
		type: 'SET_HASHED_PASSWORD',
		payload: {
			hashedPassword
		}
	};
}

// Thunks

/**
 * Test whether a diary file exists at the path specified in the preferences
 */
export function testFileExists() {
	const filePath = getDiaryFilePath();
	return dispatch => {
		dispatch(setFileExists(fileExists(filePath)));
	};
}

/**
 * Read diary entries from disk
 */
export function decryptFile(password) {
	const filePath = getDiaryFilePath();
	return dispatch => {
		dispatch(setDecryptInProgress());
		const hashedPassword = hashPassword(password);
		try {
			const fileContent = readEncryptedFile(filePath, hashedPassword);
			const { entries } = fileContent;
			// On success, load diary entries and save password
			dispatch(setDecryptSuccess(entries));
			dispatch(setHashedPassword(hashedPassword));
			createIndex(entries);
			enableMenuItems();
		} catch (err) {
			// Error reading diary file
			let errorMsg;
			if (err.message.endsWith('BAD_DECRYPT')) {
				errorMsg = 'Incorrect password';
			} else {
				errorMsg = `Error while decrypting diary file: ${err.message}`;
			}
			dispatch(setDecryptError(errorMsg));
		}
	};
}

/**
 * Create new encrypted diary file and index with the provided password
 */
export function createEncryptedFile(password) {
	const entries = {};
	const filePath = getDiaryFilePath();
	const content = {
		metadata: getMetadata(),
		entries
	};
	return dispatch => {
		dispatch(setEncryptInProgress());
		const hashedPassword = hashPassword(password);
		try {
			writeEncryptedFile(filePath, hashedPassword, content);
			dispatch(setEncryptSuccess(entries));
			dispatch(setHashedPassword(hashedPassword));
			createIndex(entries);
			enableMenuItems();
		} catch (err) {
			console.error(err);
			dispatch(setEncryptError());
		}
	};
}

/**
 * Write diary entries to disk
 */
function writeEntriesEncrypted(entries, hashedPassword) {
	const filePath = getDiaryFilePath();
	const fileContent = {
		metadata: getMetadata(),
		entries
	};
	return dispatch => {
		dispatch(setEncryptInProgress());
		try {
			writeEncryptedFile(filePath, hashedPassword, fileContent);
			dispatch(setEncryptSuccess(entries));
		} catch (err) {
			console.error(err);
			dispatch(setEncryptError());
		}
	};
}

/**
 * Write diary entries to disk with a new password. Update the password in the store
 */
export function updatePassword(newPassword) {
	return (dispatch, getState) => {
		const { entries } = getState().file;
		const hashedPassword = hashPassword(newPassword);
		dispatch(writeEntriesEncrypted(entries, hashedPassword));
		dispatch(setHashedPassword(hashedPassword));
	};
}

/**
 * Update the diary entry in the state. Remove the entry if it is empty. Then write the diary to the
 * encrypted diary file and update the index
 */
export function updateEntry(indexDate, title, text) {
	return (dispatch, getState) => {
		const { entries, hashedPassword } = getState().file;
		const entriesUpdated = { ...entries };

		if (title === '' && text === '') {
			// Empty entry
			if (indexDate in entries) {
				// If existing entry: Delete entry from file and index
				delete entriesUpdated[indexDate];
				deleteIndexDoc(indexDate);
			}
		} else if (
			!(indexDate in entries) || // Entry doesn't exist yet
			title !== entries[indexDate].title || // Title has changed
			text !== entries[indexDate].text // Text has changed
		) {
			// Non-empty and new/updated entry: Write to file and add to index
			const entryUpdated = {
				dateUpdated: new Date().toString(),
				title,
				text
			};
			entriesUpdated[indexDate] = entryUpdated;
			createOrUpdateIndexDoc(indexDate, entryUpdated);
		} else {
			return;
		}
		// Write entries to disk
		dispatch(writeEntriesEncrypted(entriesUpdated, hashedPassword));
	};
}

/**
 * Merge the provided diary JSON with the one in the Redux state. For each entry, use the new one if
 * none exists yet. Otherwise, append the new title and text to the existing ones
 */
export function mergeUpdateFile(newEntries) {
	// Check whether newEntries is an object
	if (typeof newEntries !== 'object' || newEntries === null) {
		throw Error('Entries are not an object');
	}

	return (dispatch, getState) => {
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
					text: `${oldEntry.text}\n\n----------\n\n${newEntry.text}`
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
}

/**
 * Lock the diary: Remove password and diary entries from state
 */
export function lock() {
	return dispatch => {
		dispatch(clearFileState());
		disableMenuItems();
	};
}
