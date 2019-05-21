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
} from "../../ipcMain/senders";

const fileMenu: Electron.MenuItemConstructorOptions = {
	label: translate("file"),
	submenu: [
		{
			label: translate("lock-diary"),
			id: "lock",
			accelerator: "CmdOrCtrl+L",
			click() {
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
					click() {
						importJsonDayOne();
					},
				},
				{
					label: `${translate("import-from-format", { format: "JSON (jrnl)" })}…`,
					id: "importJsonJrnl",
					click() {
						importJsonJrnl();
					},
				},
				{
					label: `${translate("import-from-format", { format: "JSON (Mini Diary)" })}…`,
					id: "importJsonMiniDiary",
					click() {
						importJsonMiniDiary();
					},
				},
				{
					label: `${translate("import-from-format", { format: "TXT (Day One)" })}…`,
					id: "importTxtDayOne",
					click() {
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
					click() {
						exportJsonMiniDiary();
					},
				},
				{
					label: `${translate("export-to-format", { format: "Markdown" })}…`,
					id: "exportMd",
					click() {
						exportMd();
					},
				},
				{
					label: `${translate("export-to-format", { format: "PDF" })}…`,
					id: "exportPdf",
					click() {
						exportPdf();
					},
				},
				{
					label: `${translate("export-to-format", { format: "TXT (Day One)" })}…`,
					id: "exportTxtDayOne",
					click() {
						exportTxtDayOne();
					},
				},
			],
		},
	],
};

export default fileMenu;
