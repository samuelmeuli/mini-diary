import { fileExists, readFile, writeFile } from '../../helpers/fileAccess';


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

function setDecryptSuccess(entries, password) {
	return {
		type: 'DECRYPT_SUCCESS',
		payload: {
			entries,
			password
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

function setEncryptSuccess() {
	return {
		type: 'ENCRYPT_SUCCESS'
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

export function setPassword(password) {
	return {
		type: 'SET_PASSWORD',
		payload: {
			password
		}
	};
}


// Thunks

export function decryptFile(filePath, password) {
	return (dispatch) => {
		dispatch(setDecryptInProgress());
		try {
			const fileContent = readFile(filePath, password);
			const { entries } = fileContent;
			// On success, load diary entries and save password
			dispatch(setDecryptSuccess(entries, password));
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

export function encryptFile(filePath, password, content) {
	return (dispatch) => {
		dispatch(setEncryptInProgress());
		try {
			writeFile(filePath, password, content);
			dispatch(setEncryptSuccess());
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
