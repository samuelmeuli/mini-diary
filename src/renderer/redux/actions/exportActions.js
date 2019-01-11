import { showExportDialog } from '../../helpers/export/exportDialog';
import { convertToMd } from '../../helpers/export/md';
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
			// Convert entries to the specified format and write them to disk
			const { entries } = getState().file;
			try {
				const entriesConverted = converterFunc(entries);
				writeFile(filePath, entriesConverted);
				dispatch(setExportSuccess());
			} catch (e) {
				dispatch(setExportError(e.message));
			}
		}
	};
}

export function exportToJson() {
	return (dispatch) => {
		dispatch(exportToFile(entries => JSON.stringify(entries, null, '\t'), 'json'));
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
}
