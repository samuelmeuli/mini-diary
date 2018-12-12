const { app, Menu } = require('electron');

const {
	lock,
	setDaySelectedNext,
	setDaySelectedPrevious,
	setMonthSelectedNext,
	setMonthSelectedPrevious,
	showPreferences
} = require('./mainIpc');


const template = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Lock diary',
				accelerator: 'CmdOrCtrl+L',
				click() {
					lock();
				}
			},
			{
				label: 'Import',
				submenu: [
					{
						label: 'Import from Day One…'
						// TODO
					},
					{
						label: 'Import from jrnl…'
						// TODO
					}
				]
			},
			{
				label: 'Export',
				submenu: [
					{
						label: 'Export to PDF…'
						// TODO
					},
					{
						label: 'Export to TXT…'
						// TODO
					},
					{
						label: 'Export to JSON…'
						// TODO
					}
					// TODO diary formats?
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
				accelerator: 'Left',
				click() {
					setDaySelectedPrevious();
				}
			},
			{
				label: 'Next day',
				accelerator: 'Right',
				click() {
					setDaySelectedNext();
				}
			},
			{ type: 'separator' },
			{
				label: 'Previous month',
				accelerator: 'CmdOrCtrl+Left',
				click() {
					setMonthSelectedPrevious();
				}
			},
			{
				label: 'Next month',
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

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
