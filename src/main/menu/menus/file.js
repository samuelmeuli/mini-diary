const { translate } = require("../../i18n/i18n");
const {
	exportToJson,
	exportToMd,
	exportToPdf,
	exportToTxt,
	importDayOne,
	importJrnl,
	importJson,
	lock,
} = require("../../ipcMain/senders");

module.exports = {
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
					label: `${translate("import-from-format", { format: "Day One" })}…`,
					id: "importFromDayOne",
					click() {
						importDayOne();
					},
				},
				{
					label: `${translate("import-from-format", { format: "jrnl" })}…`,
					id: "importFromJrnl",
					click() {
						importJrnl();
					},
				},
				{
					label: `${translate("import-from-format", { format: "JSON" })}…`,
					id: "importFromJson",
					click() {
						importJson();
					},
				},
			],
		},
		{
			label: translate("export"),
			id: "export",
			submenu: [
				{
					label: `${translate("export-to-format", { format: "PDF" })}…`,
					id: "exportToPdf",
					click() {
						exportToPdf();
					},
				},
				{
					label: `${translate("export-to-format", { format: "Markdown" })}…`,
					id: "exportToMd",
					click() {
						exportToMd();
					},
				},
				{
					label: `${translate("export-to-format", { format: "TXT" })}…`,
					id: "exportToTxt",
					click() {
						exportToTxt();
					},
				},
				{
					label: `${translate("export-to-format", { format: "JSON" })}…`,
					id: "exportToJson",
					click() {
						exportToJson();
					},
				},
			],
		},
	],
};
