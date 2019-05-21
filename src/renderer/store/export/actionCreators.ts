import { remote } from "electron";

import { convertToMiniDiaryJson } from "../../files/export/json";
import { convertToMd } from "../../files/export/md";
import { convertToPdf } from "../../files/export/pdf";
import { convertToDayOneTxt } from "../../files/export/txt";
import { writeFile } from "../../files/fileAccess";
import { translations } from "../../utils/i18n";
import { ThunkActionT } from "../store";
import {
	EXPORT_ERROR,
	EXPORT_IN_PROGRESS,
	EXPORT_SUCCESS,
	SetExportErrorAction,
	SetExportInProgressAction,
	SetExportSuccessAction,
} from "./types";

const fileExtensions: Record<ExportFormat, string> = {
	jsonMiniDiary: "json",
	md: "md",
	pdf: "pdf",
	txtDayOne: "txt",
};

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
	converterFunc: (entries: Entries) => Promise<string | Buffer>,
	exportFormat: ExportFormat,
): ThunkActionT => (dispatch, getState) => {
	const fileExtension = fileExtensions[exportFormat];
	const fileName = remote.dialog.showSaveDialog({
		defaultPath: `*/mini-diary-export.${fileExtension}`,
		buttonLabel: translations.export,
	});
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
		converterFunc(entries)
			.then(entriesConverted => {
				writeFile(filePath, entriesConverted);
				dispatch(setExportSuccess());
			})
			.catch(err => {
				dispatch(setExportError(err.toString()));
			});
	}
};

export const exportToJsonMiniDiary = (): ThunkActionT => dispatch => {
	dispatch(exportToFile(convertToMiniDiaryJson, "jsonMiniDiary"));
};

export const exportToMd = (): ThunkActionT => dispatch => {
	dispatch(exportToFile(convertToMd, "md"));
};

export const exportToPdf = (): ThunkActionT => dispatch => {
	dispatch(exportToFile(convertToPdf, "pdf"));
};

export const exportToTxtDayOne = (): ThunkActionT => dispatch => {
	dispatch(exportToFile(convertToDayOneTxt, "txtDayOne"));
};
