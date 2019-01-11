function exportState(state = {
	exportErrorMsg: '',
	exportStatus: 'idle' // One of ['idle', 'inProgress', 'error']
}, action) {
	switch (action.type) {
		case 'EXPORT_IN_PROGRESS': {
			return {
				...state,
				exportErrorMsg: '',
				exportStatus: 'inProgress'
			};
		}
		case 'EXPORT_ERROR': {
			return {
				...state,
				exportErrorMsg: action.payload.exportErrorMsg,
				exportStatus: 'error'
			};
		}
		case 'EXPORT_SUCCESS': {
			return {
				...state,
				exportErrorMsg: '',
				exportStatus: 'idle'
			};
		}
		default:
			return state;
	}
}

export default exportState;
