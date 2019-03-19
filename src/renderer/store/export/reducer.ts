import {
	EXPORT_ERROR,
	EXPORT_IN_PROGRESS,
	EXPORT_SUCCESS,
	ExportAction,
	ExportState,
} from "./types";

const initialState: ExportState = {
	exportErrorMsg: "",
	exportStatus: "idle",
};

function exportReducer(state = initialState, action: ExportAction): ExportState {
	switch (action.type) {
		case EXPORT_IN_PROGRESS: {
			return {
				...state,
				exportErrorMsg: "",
				exportStatus: "inProgress",
			};
		}
		case EXPORT_ERROR: {
			return {
				...state,
				exportErrorMsg: action.payload.exportErrorMsg,
				exportStatus: "error",
			};
		}
		case EXPORT_SUCCESS: {
			return {
				...state,
				exportErrorMsg: "",
				exportStatus: "idle",
			};
		}
		default:
			return state;
	}
}

export default exportReducer;
