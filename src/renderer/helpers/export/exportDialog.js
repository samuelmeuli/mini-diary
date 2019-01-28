import { t } from '../../electron/ipcRenderer/senders';

const { dialog } = window.require('electron').remote;

/**
 * Show dialog for choosing file path to save to
 */
export function showExportDialog(fileExtension) {
	return dialog.showSaveDialog({
		defaultPath: `*/mini-diary-export.${fileExtension}`,
		buttonLabel: t('export')
	});
}
