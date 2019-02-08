import { translations } from '../i18n';

const { dialog } = require('electron').remote;

/**
 * Show dialog for choosing file path to save to
 */
export function showExportDialog(fileExtension) {
	return dialog.showSaveDialog({
		defaultPath: `*/mini-diary-export.${fileExtension}`,
		buttonLabel: translations.export
	});
}
