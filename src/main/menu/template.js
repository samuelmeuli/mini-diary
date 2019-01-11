const { app } = require('electron');

const {
	exportToJson,
	exportToMd,
	exportToPdf,
	exportToTxt,
	importDayOne,
	importJrnl,
	importJson,
	lock,
	setDaySelectedNext,
	setDaySelectedPrevious,
	setMonthSelectedNext,
	setMonthSelectedPrevious,
	showPreferences
} = require('../ipcMain/senders');


exports.getMenuTemplate = () => {
	const template = [
		{
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
		},
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				{ role: 'selectall' }
			]
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Previous day',
					id: 'previousDay',
					accelerator: 'Left',
					click() {
						setDaySelectedPrevious();
					}
				},
				{
					label: 'Next day',
					id: 'nextDay',
					accelerator: 'Right',
					click() {
						setDaySelectedNext();
					}
				},
				{ type: 'separator' },
				{
					label: 'Previous month',
					id: 'previousMonth',
					accelerator: 'CmdOrCtrl+Left',
					click() {
						setMonthSelectedPrevious();
					}
				},
				{
					label: 'Next month',
					id: 'nextMonth',
					accelerator: 'CmdOrCtrl+Right',
					click() {
						setMonthSelectedNext();
					}
				}
			]
		},
		{
			role: 'window',
			submenu: [
				{ role: 'minimize' },
				{ role: 'close' }
			]
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'Learn More',
					click() {
						require('electron').shell.openExternal('https://minidiary.app');
					}
				}
			]
		}
	];

	// Menu items specific to macOS
	if (process.platform === 'darwin') {
		// Application menu
		template.unshift({
			label: app.getName(),
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{
					label: 'Preferences…',
					accelerator: 'CmdOrCtrl+,',
					click() {
						showPreferences();
					}
				},
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideothers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' }
			]
		});

		// Edit menu
		template[2].submenu.push(
			{ type: 'separator' },
			{
				label: 'Speech',
				submenu: [
					{ role: 'startspeaking' },
					{ role: 'stopspeaking' }
				]
			}
		);

		// Window menu
		template[4].submenu = [
			{ role: 'close' },
			{ role: 'minimize' },
			{ role: 'zoom' },
			{ type: 'separator' },
			{ role: 'front' }
		];
	}

	return template;
};
