import { createBackup } from "../../files/diary/backupFile";
import { readFile } from "../../files/fileAccess";
import { parseDayOneTxt } from "../../files/import/dayOne";
import { parseJrnlJson } from "../../files/import/jrnl";
import { parseJson } from "../../files/import/json";
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

const importDayOne = (dayOneTxtPath: string): ThunkActionT => dispatch => {
	dispatch(setImportInProgress());
	try {
		const dayOneTxt = readFile(dayOneTxtPath);
		if (dayOneTxt instanceof Buffer) {
			dispatch(setImportError("Day One file must be txt file, not binary"));
		} else {
			const json = parseDayOneTxt(dayOneTxt);
			dispatch(mergeUpdateFile(json));
			dispatch(setImportSuccess());
		}
	} catch (err) {
		dispatch(setImportError(err.toString()));
	}
};

const importJrnl = (jrnlJsonPath: string): ThunkActionT => dispatch => {
	dispatch(setImportInProgress());
	try {
		const jrnlJsonStr = readFile(jrnlJsonPath);
		if (jrnlJsonStr instanceof Buffer) {
			dispatch(setImportError("jrnl file must be JSON file, not binary"));
		} else {
			const jrnlJson = parseJrnlJson(jrnlJsonStr);
			dispatch(mergeUpdateFile(jrnlJson));
			dispatch(setImportSuccess());
		}
	} catch (err) {
		dispatch(setImportError(err.toString()));
	}
};

const importJson = (jsonPath: string): ThunkActionT => dispatch => {
	dispatch(setImportInProgress());
	try {
		const jsonStr = readFile(jsonPath);
		if (jsonStr instanceof Buffer) {
			dispatch(setImportError("Import file must be JSON file, not binary"));
		} else {
			const json = parseJson(jsonStr);
			dispatch(mergeUpdateFile(json));
			dispatch(setImportSuccess());
		}
	} catch (err) {
		dispatch(setImportError(err.toString()));
	}
};

export const runImport = (importFilePath: string): ThunkActionT => (dispatch, getState) => {
	createBackup();
	const { importFormat } = getState().import;
	if (importFormat === "dayOne") {
		dispatch(importDayOne(importFilePath));
	} else if (importFormat === "jrnl") {
		dispatch(importJrnl(importFilePath));
	} else if (importFormat === "json") {
		dispatch(importJson(importFilePath));
	} else {
		throw Error(`Unrecognized importFormat "${importFormat}"`);
	}
	dispatch(hideImportOverlay());
};
