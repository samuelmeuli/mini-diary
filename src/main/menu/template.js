const is = require('electron-is');

const appMenu = require('./menus/app');
const fileMenu = require('./menus/file');
const editMenu = require('./menus/edit');
const helpMenu = require('./menus/help');
const viewMenu = require('./menus/view');
const windowMenu = require('./menus/window');
const preferencesItem = require('./preferencesItem');
const { t } = require('../i18n/i18n');

exports.getMenuTemplate = () => {
	if (is.macOS()) {
		// Add macOS-specific items
		editMenu.submenu.push(
			{ type: 'separator' },
			{
				label: t('speech'),
				submenu: [
					{
						label: t('start-speaking'),
						role: 'startspeaking'
					},
					{
						label: t('stop-speaking'),
						role: 'stopspeaking'
					}
				]
			}
		);
		windowMenu.submenu = [
			{
				label: t('close'),
				role: 'close'
			},
			{
				label: t('minimize'),
				role: 'minimize'
			},
			{
				label: t('zoom'),
				role: 'zoom'
			},
			{ type: 'separator' },
			{
				label: t('bring-all-to-front'),
				role: 'front'
			}
		];
	} else {
		// Add preferences under "File" (will be added under "Mini Diary" for macOS)
		fileMenu.submenu.push(preferencesItem);
	}

	return [...(is.macOS() ? [appMenu] : []), fileMenu, editMenu, viewMenu, windowMenu, helpMenu];
};
