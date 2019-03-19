import {
	IMPORT_ERROR,
	IMPORT_IN_PROGRESS,
	IMPORT_SUCCESS,
	ImportAction,
	ImportState,
	SET_IMPORT_DIALOG,
} from "./types";

const initialState: ImportState = {
	importErrorMsg: "",
	importFormat: null,
	importStatus: "idle",
	showImportOverlay: false,
};

function importReducer(state = initialState, action: ImportAction): ImportState {
	switch (action.type) {
		case IMPORT_IN_PROGRESS: {
			return {
				...state,
				importErrorMsg: "",
				importStatus: "inProgress",
			};
		}
		case IMPORT_ERROR: {
			return {
				...state,
				importErrorMsg: action.payload.importErrorMsg,
				importStatus: "error",
			};
		}
		case IMPORT_SUCCESS: {
			return {
				...state,
				importErrorMsg: "",
				importStatus: "idle",
			};
		}
		case SET_IMPORT_DIALOG: {
			return {
				...state,
				importFormat: action.payload.importFormat,
				showImportOverlay: action.payload.showImportOverlay,
			};
		}
		default:
			return state;
	}
}

export default importReducer;
