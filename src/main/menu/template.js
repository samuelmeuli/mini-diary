const appMenu = require('./menus/app');
const fileMenu = require('./menus/file');
const editMenu = require('./menus/edit');
const helpMenu = require('./menus/help');
const viewMenu = require('./menus/view');
const windowMenu = require('./menus/window');
const preferencesItem = require('./preferencesItem');

const isMac = process.platform === 'darwin';


exports.getMenuTemplate = () => {
	if (isMac) {
		// Add macOS-specific items
		editMenu.submenu.push(
			{ type: 'separator' },
			{
				label: 'Speech',
				submenu: [
					{ role: 'startspeaking' },
					{ role: 'stopspeaking' }
				]
			}
		);
		windowMenu.submenu = [
			{ role: 'close' },
			{ role: 'minimize' },
			{ role: 'zoom' },
			{ type: 'separator' },
			{ role: 'front' }
		];
	} else {
		// Add preferences under "File" (will be added under "Mini Diary" for macOS)
		fileMenu.submenu.push(preferencesItem);
	}

	return [
		...(isMac ? [appMenu] : []),
		fileMenu,
		editMenu,
		viewMenu,
		windowMenu,
		helpMenu
	];
};
