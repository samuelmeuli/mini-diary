import { translations } from "../../utils/i18n";

const { dialog } = require("electron").remote;

/**
 * Show dialog for choosing file path to save to
 */
export function showExportDialog(fileExtension: ExportFormat): string {
	return dialog.showSaveDialog({
		defaultPath: `*/mini-diary-export.${fileExtension}`,
		buttonLabel: translations.export,
	});
}
