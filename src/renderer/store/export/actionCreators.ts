import { remote } from "electron";

import logger from "electron-log";

import { convertToMiniDiaryJson } from "../../files/export/json";
import { convertToMd } from "../../files/export/md";
import { convertToPdf } from "../../files/export/pdf";
import { convertToDayOneTxt } from "../../files/export/txt";
import { writeFile } from "../../files/fileAccess";
import { ExportFormat, Entries } from "../../types";
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
): ThunkActionT => async (dispatch, getState): Promise<void> => {
	const fileExtension = fileExtensions[exportFormat];
	const { canceled, filePath } = await remote.dialog.showSaveDialog({
		defaultPath: `*/mini-diary-export.${fileExtension}`,
		buttonLabel: translations.export,
	});
	if (!canceled && filePath) {
		dispatch(setExportInProgress());
		// Sort and convert entries to the specified format, then write them to disk
		const { entries } = getState().file;
		converterFunc(entries)
			.then(entriesConverted => {
				writeFile(filePath, entriesConverted);
				dispatch(setExportSuccess());
			})
			.catch(err => {
				logger.error("Error exporting diary file: ", err);
				dispatch(setExportError(err.toString()));
			});
	}
};

export const exportToJsonMiniDiary = (): ThunkActionT => (dispatch): void => {
	dispatch(exportToFile(convertToMiniDiaryJson, "jsonMiniDiary"));
};

export const exportToMd = (): ThunkActionT => (dispatch): void => {
	dispatch(exportToFile(convertToMd, "md"));
};

export const exportToPdf = (): ThunkActionT => (dispatch): void => {
	dispatch(exportToFile(convertToPdf, "pdf"));
};

export const exportToTxtDayOne = (): ThunkActionT => (dispatch): void => {
	dispatch(exportToFile(convertToDayOneTxt, "txtDayOne"));
};
