import { disableMenuItems, enableMenuItems } from '../../electron/ipcRenderer/senders';
import { fileExists, readEncryptedFile, writeEncryptedFile } from '../../helpers/fileAccess';
import { hashPassword } from '../../helpers/hashPassword';
import { getMetadata } from '../../helpers/metadata';
import { getFilePath } from '../../helpers/preferences';
import { createIndex, readIndex, updateIndex, writeIndex } from '../../helpers/searchIndex';


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
	const filePath = getFilePath();
	return (dispatch) => {
		dispatch(setFileExists(fileExists(filePath)));
	};
}

/**
 * Create new encrypted diary and index files with the provided password
 */
export function createEncryptedFile(password) {
	const entries = {};
	const filePath = getFilePath();
	const content = {
		metadata: getMetadata(),
		entries
	};
	return (dispatch) => {
		dispatch(setEncryptInProgress());
		const hashedPassword = hashPassword(password);
		try {
			writeEncryptedFile(filePath, hashedPassword, content);
			dispatch(setEncryptSuccess(entries));
			dispatch(setHashedPassword(hashedPassword));
			createIndex(entries, hashedPassword);
			enableMenuItems();
		} catch (err) {
			console.error(err);
			dispatch(setEncryptError());
		}
	};
}

/**
 * Read diary entries and index from disk
 */
export function decryptFile(password) {
	const filePath = getFilePath();
	return (dispatch) => {
		dispatch(setDecryptInProgress());
		const hashedPassword = hashPassword(password);
		try {
			const fileContent = readEncryptedFile(filePath, hashedPassword);
			const { entries } = fileContent;
			// On success, load diary entries and save password
			dispatch(setDecryptSuccess(entries));
			dispatch(setHashedPassword(hashedPassword));
			readIndex(entries, hashedPassword);
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
 * Write diary entries and index to disk
 */
function encryptFile(entries) {
	const filePath = getFilePath();
	const content = {
		metadata: getMetadata(),
		entries
	};
	return (dispatch, getState) => {
		const { hashedPassword } = getState().file;
		dispatch(setEncryptInProgress());
		try {
			writeEncryptedFile(filePath, hashedPassword, content);
			dispatch(setEncryptSuccess(entries));
			writeIndex(hashedPassword);
		} catch (err) {
			console.error(err);
			dispatch(setEncryptError());
		}
	};
}

/**
 * Update the diary entry in the state. Remove the entry if it is empty. Then write the diary to the
 * encrypted diary file and update the index
 */
export function updateEntry(indexDate, title, text) {
	return (dispatch, getState) => {
		const { entries } = getState().file;

		if (title === '' && text === '') {
			// Empty entry: Delete entry from file if it exists
			if (indexDate in entries) {
				const entriesUpdated = entries;
				delete entriesUpdated[indexDate];
				// Remove from index
				updateIndex(indexDate, {
					title: '',
					text: ''
				});
				// Write to diary and index files
				dispatch(encryptFile(entriesUpdated));
			}
		} else if (
			!(indexDate in entries)
			|| title !== entries[indexDate].title
			|| text !== entries[indexDate].text
		) {
			// Non-empty and changed/missing entry: Write to file
			const entryUpdated = {
				dateUpdated: new Date().toString(),
				title,
				text
			};
			const entriesUpdated = {
				...entries,
				[indexDate]: entryUpdated
			};
			// Update index
			updateIndex(indexDate, entryUpdated);
			// Write to diary and index files
			dispatch(encryptFile(entriesUpdated));
		}
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
		const { entries } = getState().file;
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
			updateIndex(indexDate, entryUpdated);
		});
		dispatch(encryptFile(entriesUpdated));
	};
}

/**
 * Lock the diary: Remove password and diary entries from state
 */
export function lock() {
	return (dispatch) => {
		dispatch(clearFileState());
		disableMenuItems();
	};
}
