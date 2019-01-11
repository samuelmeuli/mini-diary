import { showExportDialog } from '../../helpers/export/exportDialog';
import { convertToJson } from '../../helpers/export/json';
import { convertToMd } from '../../helpers/export/md';
import { convertToPdf } from '../../helpers/export/pdf';
import { convertToTxt } from '../../helpers/export/txt';
import { writeFile } from '../../helpers/fileAccess';


// Action creators

function setExportInProgress() {
	return {
		type: 'EXPORT_IN_PROGRESS'
	};
}

function setExportError(exportErrorMsg) {
	return {
		type: 'EXPORT_ERROR',
		payload: {
			exportErrorMsg
		}
	};
}

function setExportSuccess() {
	return {
		type: 'EXPORT_SUCCESS'
	};
}


// Thunks

function exportToFile(converterFunc, fileExtension) {
	return (dispatch, getState) => {
		const fileName = showExportDialog(fileExtension);
		if (fileName) {
			dispatch(setExportInProgress());
			// Build file name
			let filePath;
			if (fileName.endsWith(`.${fileExtension}`)) {
				filePath = fileName;
			} else {
				filePath = `${fileName}.${fileExtension}`;
			}
			// Sort and convert entries to the specified format, then write them to disk
			const { entries } = getState().file;
			const entriesSorted = Object.entries(entries).sort((a, b) => a[0].localeCompare(b[0]));
			converterFunc(entriesSorted)
				.then((entriesConverted) => {
					writeFile(filePath, entriesConverted);
					dispatch(setExportSuccess());
				})
				.catch((err) => {
					dispatch(setExportError(err.toString()));
				});
		}
	};
}

export function exportToJson() {
	return (dispatch) => {
		dispatch(exportToFile(convertToJson, 'json'));
	};
}

export function exportToMd() {
	return (dispatch) => {
		dispatch(exportToFile(convertToMd, 'md'));
	};
}

export function exportToTxt() {
	return (dispatch) => {
		dispatch(exportToFile(convertToTxt, 'txt'));
	};
}

export function exportToPdf() {
	return (dispatch) => {
		dispatch(exportToFile(convertToPdf, 'pdf'));
	};
}
