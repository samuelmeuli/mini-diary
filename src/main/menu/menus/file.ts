import { MenuItemConstructorOptions } from "electron";

import { translate } from "../../i18n/i18n";
import {
	exportJsonMiniDiary,
	exportMd,
	exportPdf,
	exportTxtDayOne,
	importJsonDayOne,
	importJsonJrnl,
	importJsonMiniDiary,
	importTxtDayOne,
	lock,
	openOverlay,
} from "../../ipcMain/senders";

export default function getFileMenu(): MenuItemConstructorOptions {
	return {
		label: translate("file"),
		submenu: [
			{
				label: translate("lock-diary"),
				id: "lock",
				accelerator: "CmdOrCtrl+L",
				click(): void {
					lock();
				},
			},
			{ type: "separator" },
			{
				label: translate("import"),
				submenu: [
					{
						label: `${translate("import-from-format", { format: "JSON (Day One)" })}…`,
						id: "importJsonDayOne",
						click(): void {
							importJsonDayOne();
						},
					},
					{
						label: `${translate("import-from-format", { format: "JSON (jrnl)" })}…`,
						id: "importJsonJrnl",
						click(): void {
							importJsonJrnl();
						},
					},
					{
						label: `${translate("import-from-format", { format: "JSON (Mini Diary)" })}…`,
						id: "importJsonMiniDiary",
						click(): void {
							importJsonMiniDiary();
						},
					},
					{
						label: `${translate("import-from-format", { format: "TXT (Day One)" })}…`,
						id: "importTxtDayOne",
						click(): void {
							importTxtDayOne();
						},
					},
				],
			},
			{
				label: translate("export"),
				id: "export",
				submenu: [
					{
						label: `${translate("export-to-format", { format: "JSON (Mini Diary)" })}…`,
						id: "exportJsonMiniDiary",
						click(): void {
							exportJsonMiniDiary();
						},
					},
					{
						label: `${translate("export-to-format", { format: "Markdown" })}…`,
						id: "exportMd",
						click(): void {
							exportMd();
						},
					},
					{
						label: `${translate("export-to-format", { format: "PDF" })}…`,
						id: "exportPdf",
						click(): void {
							exportPdf();
						},
					},
					{
						label: `${translate("export-to-format", { format: "TXT (Day One)" })}…`,
						id: "exportTxtDayOne",
						click(): void {
							exportTxtDayOne();
						},
					},
				],
			},
			{ type: "separator" },
			{
				label: translate("statistics"),
				id: "statistics",
				click(): void {
					openOverlay("statistics");
				},
			},
		],
	};
}
