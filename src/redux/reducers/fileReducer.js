function file(state = {
	decryptStatus: 'idle', // One of ['idle', 'inProgress', 'error', 'success']
	encryptStatus: 'idle', // One of ['idle', 'inProgress', 'error', 'success']
	entries: [],
	fileExists: false,
	hashedPassword: ''
}, action) {
	switch (action.type) {
		case 'DECRYPT_IN_PROGRESS': {
			return {
				...state,
				decryptStatus: 'inProgress'
			};
		}
		case 'DECRYPT_ERROR': {
			return {
				...state,
				decryptStatus: 'error'
			};
		}
		case 'DECRYPT_SUCCESS': {
			return {
				...state,
				decryptStatus: 'success',
				entries: action.payload.entries
			};
		}
		case 'ENCRYPT_IN_PROGRESS': {
			return {
				...state,
				encryptStatus: 'inProgress'
			};
		}
		case 'ENCRYPT_ERROR': {
			return {
				...state,
				encryptStatus: 'error'
			};
		}
		case 'ENCRYPT_SUCCESS': {
			return {
				...state,
				encryptStatus: 'success',
				entries: action.payload.entries
			};
		}
		case 'SET_FILE_EXISTS': {
			return {
				...state,
				fileExists: action.payload.fileExists
			};
		}
		case 'SET_HASHED_PASSWORD': {
			return {
				...state,
				hashedPassword: action.payload.hashedPassword
			};
		}
		default:
			return state;
	}
}

export default file;
