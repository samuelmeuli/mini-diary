import { readFile } from "../../files/fileAccess";
import { parseDayOneJson, parseJrnlJson, parseMiniDiaryJson } from "../../files/import/json";
import { parseDayOneTxt } from "../../files/import/txt";
import { mergeUpdateFile } from "../file/actionCreators";
import { ThunkActionT } from "../store";
import {
	IMPORT_ERROR,
	IMPORT_IN_PROGRESS,
	IMPORT_SUCCESS,
	SetImportErrorAction,
	SetImportInProgressAction,
	SetImportOverlayAction,
	SetImportSuccessAction,
	SET_IMPORT_DIALOG,
} from "./types";

// Action creators

function setImportInProgress(): SetImportInProgressAction {
	return {
		type: IMPORT_IN_PROGRESS,
	};
}

function setImportError(importErrorMsg: string): SetImportErrorAction {
	return {
		type: IMPORT_ERROR,
		payload: {
			importErrorMsg,
		},
	};
}

function setImportSuccess(): SetImportSuccessAction {
	return {
		type: IMPORT_SUCCESS,
	};
}

export function hideImportOverlay(): SetImportOverlayAction {
	return {
		type: SET_IMPORT_DIALOG,
		payload: {
			importFormat: null,
			showImportOverlay: false,
		},
	};
}

export function showImportOverlay(importFormat: ImportFormat): SetImportOverlayAction {
	return {
		type: SET_IMPORT_DIALOG,
		payload: {
			importFormat,
			showImportOverlay: true,
		},
	};
}

// Thunks

export const runImport = (importFilePath: string): ThunkActionT => (dispatch, getState) => {
	const { importFormat } = getState().import;

	dispatch(setImportInProgress());
	try {
		const fileContent = readFile(importFilePath);
		if (fileContent instanceof Buffer) {
			throw Error("Import file cannot be binary");
		}

		// Get parser function for import format
		let parseFunc;
		if (importFormat === "jsonDayOne") {
			parseFunc = parseDayOneJson;
		} else if (importFormat === "jsonJrnl") {
			parseFunc = parseJrnlJson;
		} else if (importFormat === "jsonMiniDiary") {
			parseFunc = parseMiniDiaryJson;
		} else if (importFormat === "txtDayOne") {
			parseFunc = parseDayOneTxt;
		} else {
			throw Error(`Unrecognized importFormat "${importFormat}"`);
		}

		// Parse file and make it compatible with Mini Diary
		const json = parseFunc(fileContent);
		dispatch(mergeUpdateFile(json));
		dispatch(setImportSuccess());
		dispatch(hideImportOverlay());
	} catch (err) {
		dispatch(setImportError(err.toString()));
	}
};
