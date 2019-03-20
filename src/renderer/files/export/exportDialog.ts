import { remote } from "electron";

import { translations } from "../../utils/i18n";

/**
 * Show dialog for choosing file path to save to
 */
export function showExportDialog(fileExtension: ExportFormat): string {
	return remote.dialog.showSaveDialog({
		defaultPath: `*/mini-diary-export.${fileExtension}`,
		buttonLabel: translations.export,
	});
}
