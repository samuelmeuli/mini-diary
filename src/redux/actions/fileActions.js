import { fileExists, readFile, writeFile } from '../../helpers/fileAccess';
import hashPassword from '../../helpers/hashPassword';
import { createIndex, readIndex, writeIndex } from '../../helpers/searchIndex';


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


// Thunks

export function createEncryptedFile(filePath, password) {
	const entries = {};
	const content = {
		metadata: {
			application: 'application', // TODO get app name
			version: 'version' // TODO get version
		},
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

export function encryptFile(filePath, hashedPassword, entries) {
	const content = {
		metadata: {
			application: 'application', // TODO get app name
			version: 'version' // TODO get version
		},
		entries
	};
	return (dispatch) => {
		dispatch(setEncryptInProgress());
		try {
			writeFile(filePath, hashedPassword, content);
			dispatch(setEncryptSuccess(entries));
			writeIndex(hashedPassword); // TODO update index first
		} catch (err) {
			console.error(err);
			dispatch(setEncryptError());
		}
	};
}

export function testFileExists(filePath) {
	return (dispatch) => {
		dispatch(setFileExists(fileExists(filePath)));
	};
}
