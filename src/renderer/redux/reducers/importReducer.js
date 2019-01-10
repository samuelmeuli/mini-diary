function importState(state = {
	importStatus: 'idle', // One of ['idle', 'inProgress', 'error']
	importErrorMsg: '',
	importFormat: '', // One of ['dayOne', 'jrnl', 'json']
	showImportOverlay: false
}, action) {
	switch (action.type) {
		case 'IMPORT_IN_PROGRESS': {
			return {
				...state,
				importErrorMsg: '',
				importStatus: 'inProgress'
			};
		}
		case 'IMPORT_ERROR': {
			return {
				...state,
				importErrorMsg: action.payload.importErrorMsg,
				importStatus: 'error'
			};
		}
		case 'IMPORT_SUCCESS': {
			return {
				...state,
				importErrorMsg: '',
				importStatus: 'idle'
			};
		}
		case 'SET_IMPORT_DIALOG': {
			return {
				...state,
				importFormat: action.payload.importFormat,
				showImportOverlay: action.payload.showImportOverlay
			};
		}
		default:
			return state;
	}
}

export default importState;
