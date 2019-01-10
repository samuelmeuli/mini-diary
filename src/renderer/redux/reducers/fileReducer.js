function file(state = {
	decryptErrorMsg: '',
	decryptStatus: 'idle', // One of ['idle', 'inProgress', 'error']
	encryptStatus: 'idle', // One of ['idle', 'inProgress', 'error']
	entries: {},
	fileExists: false,
	hashedPassword: ''
}, action) {
	switch (action.type) {
		case 'CLEAR_FILE_STATE': {
			return {
				...state,
				entries: {},
				hashedPassword: ''
			};
		}
		case 'DECRYPT_IN_PROGRESS': {
			return {
				...state,
				decryptErrorMsg: '',
				decryptStatus: 'inProgress'
			};
		}
		case 'DECRYPT_ERROR': {
			return {
				...state,
				decryptErrorMsg: action.payload.decryptErrorMsg,
				decryptStatus: 'error'
			};
		}
		case 'DECRYPT_SUCCESS': {
			return {
				...state,
				decryptErrorMsg: '',
				decryptStatus: 'idle',
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
				encryptStatus: 'idle',
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
