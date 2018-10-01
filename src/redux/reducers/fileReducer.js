function file(state = {
	decryptStatus: 'idle', // one of ['idle', 'inProgress', 'error', 'success']
	encryptStatus: 'idle', // one of ['idle', 'inProgress', 'error', 'success']
	entries: [],
	fileExists: false,
	password: ''
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
				entries: action.payload.entries,
				password: action.payload.password
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
				encryptStatus: 'success'
			};
		}
		case 'SET_FILE_EXISTS': {
			return {
				...state,
				fileExists: action.payload.fileExists
			};
		}
		case 'SET_PASSWORD': {
			return {
				...state,
				password: action.payload.password
			};
		}
		default:
			return state;
	}
}

export default file;
