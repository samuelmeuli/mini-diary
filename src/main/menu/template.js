const is = require('electron-is');

const { translate } = require('../i18n/i18n');
const appMenu = require('./menus/app');
const fileMenu = require('./menus/file');
const editMenu = require('./menus/edit');
const helpMenu = require('./menus/help');
const viewMenu = require('./menus/view');
const windowMenu = require('./menus/window');
const preferencesItem = require('./preferencesItem');

exports.getMenuTemplate = () => {
	if (is.macOS()) {
		// Add macOS-specific items
		editMenu.submenu.push(
			{ type: 'separator' },
			{
				label: translate('speech'),
				submenu: [
					{
						label: translate('start-speaking'),
						role: 'startspeaking'
					},
					{
						label: translate('stop-speaking'),
						role: 'stopspeaking'
					}
				]
			}
		);
		windowMenu.submenu = [
			{
				label: translate('close'),
				role: 'close'
			},
			{
				label: translate('minimize'),
				role: 'minimize'
			},
			{
				label: translate('zoom'),
				role: 'zoom'
			},
			{ type: 'separator' },
			{
				label: translate('bring-all-to-front'),
				role: 'front'
			}
		];
	} else {
		// Add preferences under "File" (will be added under "Mini Diary" for macOS)
		fileMenu.submenu.push(preferencesItem);
	}

	return [...(is.macOS() ? [appMenu] : []), fileMenu, editMenu, viewMenu, windowMenu, helpMenu];
};
