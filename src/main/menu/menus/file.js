const {
	exportToJson,
	exportToMd,
	exportToPdf,
	exportToTxt,
	importDayOne,
	importJrnl,
	importJson,
	lock
} = require('../../ipcMain/senders');


module.exports = {
	label: 'File',
	submenu: [
		{
			label: 'Lock diary',
			id: 'lock',
			accelerator: 'CmdOrCtrl+L',
			click() {
				lock();
			}
		},
		{ type: 'separator' },
		{
			label: 'Import',
			submenu: [
				{
					label: 'Import from Day One…',
					id: 'importFromDayOne',
					click() {
						importDayOne();
					}
				},
				{
					label: 'Import from jrnl…',
					id: 'importFromJrnl',
					click() {
						importJrnl();
					}
				},
				{
					label: 'Import from JSON…',
					id: 'importFromJson',
					click() {
						importJson();
					}
				}
			]
		},
		{
			label: 'Export',
			id: 'export',
			submenu: [
				{
					label: 'Export to PDF…',
					id: 'exportToPdf',
					click() {
						exportToPdf();
					}
				},
				{
					label: 'Export to Markdown…',
					id: 'exportToMd',
					click() {
						exportToMd();
					}
				},
				{
					label: 'Export to TXT…',
					id: 'exportToTxt',
					click() {
						exportToTxt();
					}
				},
				{
					label: 'Export to JSON…',
					id: 'exportToJson',
					click() {
						exportToJson();
					}
				}
			]
		}
	]
};
