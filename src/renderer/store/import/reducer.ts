import {
	IMPORT_ERROR,
	IMPORT_IN_PROGRESS,
	IMPORT_SUCCESS,
	ImportAction,
	ImportState,
	SET_IMPORT_FORMAT,
} from "./types";

const initialState: ImportState = {
	importErrorMsg: "",
	importFormat: "jsonMiniDiary",
	importStatus: "idle",
};

function importReducer(state = initialState, action: ImportAction): ImportState {
	switch (action.type) {
		case SET_IMPORT_FORMAT: {
			return {
				...state,
				importFormat: action.payload.importFormat,
			};
		}
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
		default:
			return state;
	}
}

export default importReducer;
