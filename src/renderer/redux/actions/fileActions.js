import { fileExists, readFile, writeFile } from '../../helpers/fileAccess';
import hashPassword from '../../helpers/hashPassword';
import { getMetadata } from '../../helpers/metadata';
import { createIndex, readIndex, updateIndex, writeIndex } from '../../helpers/searchIndex';


// Action creators

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

export function lock() {
	return {
		type: 'LOCK'
	};
}


// Thunks

export function testFileExists(filePath) {
	return (dispatch) => {
		dispatch(setFileExists(fileExists(filePath)));
	};
}

export function createEncryptedFile(filePath, password) {
	const entries = {};
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
		} catch (err) {
			console.error(err);
			dispatch(setEncryptError());
		}
	};
}

export function decryptFile(filePath, password) {
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

function encryptFile(filePath, hashedPassword, entries) {
	const content = {
		metadata: getMetadata(),
		entries
	};
	return (dispatch) => {
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

export function updateFile(filePath, hashedPassword, dateFormatted, title, text) {
	return (dispatch, getState) => {
		const { entries } = getState().file;

		if (title === '' && text === '') {
			// Empty entry: Delete entry from file if it exists
			if (dateFormatted in entries) {
				const entriesUpdated = entries;
				delete entriesUpdated[dateFormatted];
				dispatch(encryptFile(filePath, hashedPassword, entriesUpdated));
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
			dispatch(encryptFile(filePath, hashedPassword, entriesUpdated));
			updateIndex(dateFormatted, entryUpdated);
		}
	};
}
