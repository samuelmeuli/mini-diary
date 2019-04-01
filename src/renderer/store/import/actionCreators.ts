import { createBackup } from "../../files/diary/backupFile";
import { readFile } from "../../files/fileAccess";
import { parseDayOneJson } from "../../files/import/dayOne";
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

export const runImport = (importFilePath: string): ThunkActionT => (dispatch, getState) => {
	const { importFormat } = getState().import;

	createBackup();
	dispatch(setImportInProgress());
	try {
		const importJsonStr = readFile(importFilePath);
		if (importJsonStr instanceof Buffer) {
			throw Error("Import file must be JSON file, not binary");
		}
		// Parse JSON file from string
		const importJson = JSON.parse(importJsonStr);

		// Get JSON parser function for import format
		let parseFunc;
		if (importFormat === "dayOne") {
			parseFunc = parseDayOneJson;
		} else if (importFormat === "jrnl") {
			parseFunc = parseJrnlJson;
		} else if (importFormat === "json") {
			parseFunc = parseJson;
		} else {
			throw Error(`Unrecognized importFormat "${importFormat}"`);
		}

		// Parse file and make it compatible with Mini Diary
		const json = parseFunc(importJson);
		dispatch(mergeUpdateFile(json));
		dispatch(setImportSuccess());
		dispatch(hideImportOverlay());
	} catch (err) {
		dispatch(setImportError(err.toString()));
	}
};
