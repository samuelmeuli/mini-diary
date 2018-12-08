const { app, Menu } = require('electron');

const { sendLock, showPreferences } = require('./mainIpc');


const template = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Lock diary',
				accelerator: 'CmdOrCtrl+L',
				click() {
					sendLock();
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
	template[3].submenu = [
		{ role: 'close' },
		{ role: 'minimize' },
		{ role: 'zoom' },
		{ type: 'separator' },
		{ role: 'front' }
	];
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
