const { ipcMain } = require('electron');

const { getLang, t } = require('../i18n/i18n');
const { disableMenuItems, enableMenuItems } = require('../menu/menu');
const { getWindow } = require('../window');

// Localization

ipcMain.on('getLang', e => {
	e.returnValue = getLang();
});

ipcMain.on('translate', (e, i18nKey, ...args) => {
	e.returnValue = t(i18nKey, ...args);
});

// Menu items

ipcMain.on('disableMenuItems', () => {
	disableMenuItems();
});

ipcMain.on('enableMenuItems', () => {
	enableMenuItems();
});

// Window

ipcMain.on('toggleWindowSize', () => {
	const window = getWindow();
	if (window.isMaximized()) {
		window.unmaximize();
	} else {
		window.maximize();
	}
});
