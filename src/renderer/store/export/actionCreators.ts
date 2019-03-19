import { showExportDialog } from "../../files/export/exportDialog";
import { convertToJson } from "../../files/export/json";
import { convertToMd } from "../../files/export/md";
import { convertToPdf } from "../../files/export/pdf";
import { convertToTxt } from "../../files/export/txt";
import { writeFile } from "../../files/fileAccess";
import { ThunkActionT } from "../store";
import {
	EXPORT_ERROR,
	EXPORT_IN_PROGRESS,
	EXPORT_SUCCESS,
	SetExportErrorAction,
	SetExportInProgressAction,
	SetExportSuccessAction,
} from "./types";

// Action creators

function setExportInProgress(): SetExportInProgressAction {
	return {
		type: EXPORT_IN_PROGRESS,
	};
}

function setExportError(exportErrorMsg: string): SetExportErrorAction {
	return {
		type: EXPORT_ERROR,
		payload: {
			exportErrorMsg,
		},
	};
}

function setExportSuccess(): SetExportSuccessAction {
	return {
		type: EXPORT_SUCCESS,
	};
}

// Thunks

const exportToFile = (
	converterFunc: (entriesSorted: [string, DiaryEntry][]) => Promise<string | Buffer>,
	fileExtension: ExportFormat,
): ThunkActionT => (dispatch, getState) => {
	const fileName = showExportDialog(fileExtension);
	if (fileName) {
		dispatch(setExportInProgress());
		// Build file name
		let filePath: string;
		if (fileName.endsWith(`.${fileExtension}`)) {
			filePath = fileName;
		} else {
			filePath = `${fileName}.${fileExtension}`;
		}
		// Sort and convert entries to the specified format, then write them to disk
		const { entries } = getState().file;
		const entriesSorted = Object.entries(entries).sort((a, b) => a[0].localeCompare(b[0]));
		converterFunc(entriesSorted)
			.then(entriesConverted => {
				writeFile(filePath, entriesConverted);
				dispatch(setExportSuccess());
			})
			.catch(err => {
				dispatch(setExportError(err.toString()));
			});
	}
};

export const exportToJson = (): ThunkActionT => dispatch => {
	dispatch(exportToFile(convertToJson, "json"));
};

export const exportToMd = (): ThunkActionT => dispatch => {
	dispatch(exportToFile(convertToMd, "md"));
};

export const exportToTxt = (): ThunkActionT => dispatch => {
	dispatch(exportToFile(convertToTxt, "txt"));
};

export const exportToPdf = (): ThunkActionT => dispatch => {
	dispatch(exportToFile(convertToPdf, "pdf"));
};
