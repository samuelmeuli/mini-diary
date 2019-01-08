import { disableMenuItems, enableMenuItems } from '../../electron/ipcRenderer/senders';
import { fileExists, readFile, writeFile } from '../../helpers/fileAccess';
import hashPassword from '../../helpers/hashPassword';
import { getMetadata } from '../../helpers/metadata';
import { getFilePath } from '../../helpers/preferences';
import { createIndex, readIndex, updateIndex, writeIndex } from '../../helpers/searchIndex';


// Action creators

function setDecryptReset() {
	return {
		type: 'DECRYPT_RESET'
	};
}

function setDecryptInProgress() {
	return {
		type: 'DECRYPT_IN_PROGRESS'
	};
}

function setDecryptError() {
	return {
		type: 'DECRYPT_ERROR'
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

export function testFileExists() {
	const filePath = getFilePath();
	return (dispatch) => {
		dispatch(setFileExists(fileExists(filePath)));
	};
}

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
			writeFile(filePath, hashedPassword, content);
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

export function decryptFile(password) {
	const filePath = getFilePath();
	return (dispatch) => {
		dispatch(setDecryptInProgress());
		const hashedPassword = hashPassword(password);
		try {
			const fileContent = readFile(filePath, hashedPassword);
			const { entries } = fileContent;
			// On success, load diary entries and save password
			dispatch(setDecryptSuccess(entries));
			dispatch(setHashedPassword(hashedPassword));
			readIndex(entries, hashedPassword);
			enableMenuItems();
		} catch (err) {
			// Error reading diary file
			if (!err.message.endsWith('bad decrypt')) {
				// Other error (not incorrect password error)
				console.error(err);
			}
			dispatch(setDecryptError());
		}
	};
}

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
			writeFile(filePath, hashedPassword, content);
			dispatch(setEncryptSuccess(entries));
			writeIndex(hashedPassword);
		} catch (err) {
			console.error(err);
			dispatch(setEncryptError());
		}
	};
}

export function updateFile(dateFormatted, title, text) {
	return (dispatch, getState) => {
		const { entries } = getState().file;

		if (title === '' && text === '') {
			// Empty entry: Delete entry from file if it exists
			if (dateFormatted in entries) {
				const entriesUpdated = entries;
				delete entriesUpdated[dateFormatted];
				dispatch(encryptFile(entriesUpdated));
			}
		} else if (
			!(dateFormatted in entries)
			|| text !== entries[dateFormatted].text
			|| title !== entries[dateFormatted].title
		) {
			// Non-empty and changed/missing entry: Write to file
			const entryUpdated = {
				dateUpdated: new Date().toString(),
				text,
				title
			};
			const entriesUpdated = {
				...entries,
				[dateFormatted]: entryUpdated
			};
			dispatch(encryptFile(entriesUpdated));
			updateIndex(dateFormatted, entryUpdated);
		}
	};
}

export function lock() {
	return (dispatch) => {
		dispatch(setDecryptReset());
		dispatch(setHashedPassword(''));
		disableMenuItems();
	};
}
