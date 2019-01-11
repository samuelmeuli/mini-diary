import { mergeUpdateFile } from './fileActions';
import { readFile } from '../../helpers/fileAccess';
import { backupFile } from '../../helpers/import/backupFile';
import { parseDayOneTxt } from '../../helpers/import/dayOne';
import { parseJrnlJson } from '../../helpers/import/jrnl';
import { parseJson } from '../../helpers/import/json';
import { getFilePath } from '../../helpers/preferences';


// Action creators

function setImportInProgress() {
	return {
		type: 'IMPORT_IN_PROGRESS'
	};
}

function setImportError(importErrorMsg) {
	return {
		type: 'IMPORT_ERROR',
		payload: {
			importErrorMsg
		}
	};
}

function setImportSuccess() {
	return {
		type: 'IMPORT_SUCCESS'
	};
}

export function hideImportOverlay() {
	return {
		type: 'SET_IMPORT_DIALOG',
		payload: {
			importFormat: '',
			showImportOverlay: false
		}
	};
}

export function showImportOverlay(importFormat) {
	return {
		type: 'SET_IMPORT_DIALOG',
		payload: {
			importFormat,
			showImportOverlay: true
		}
	};
}


// Thunks

function importDayOne(dayOneTxtPath) {
	return (dispatch) => {
		dispatch(setImportInProgress());
		try {
			const dayOneTxt = readFile(dayOneTxtPath);
			const json = parseDayOneTxt(dayOneTxt);
			dispatch(mergeUpdateFile(json));
			dispatch(setImportSuccess());
		} catch (err) {
			dispatch(setImportError(err.toString()));
		}
	};
}

function importJrnl(jrnlJsonPath) {
	return (dispatch) => {
		dispatch(setImportInProgress());
		try {
			const jrnlJsonStr = readFile(jrnlJsonPath);
			const json = parseJrnlJson(jrnlJsonStr);
			dispatch(mergeUpdateFile(json));
			dispatch(setImportSuccess());
		} catch (err) {
			dispatch(setImportError(err.toString()));
		}
	};
}

function importJson(jsonPath) {
	return (dispatch) => {
		dispatch(setImportInProgress());
		try {
			const jsonStr = readFile(jsonPath);
			const json = parseJson(jsonStr);
			dispatch(mergeUpdateFile(json));
			dispatch(setImportSuccess());
		} catch (err) {
			dispatch(setImportError(err.toString()));
		}
	};
}

export function runImport(importFilePath) {
	const diaryFilePath = getFilePath();
	backupFile(diaryFilePath);
	return (dispatch, getState) => {
		const { importFormat } = getState().import;
		if (importFormat === 'dayOne') {
			dispatch(importDayOne(importFilePath));
		} else if (importFormat === 'jrnl') {
			dispatch(importJrnl(importFilePath));
		} else if (importFormat === 'json') {
			dispatch(importJson(importFilePath));
		} else {
			throw Error(`Unrecognized importFormat "${importFormat}"`);
		}
		dispatch(hideImportOverlay());
	};
}
