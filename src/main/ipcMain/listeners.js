const { ipcMain } = require('electron');

const { disableMenuItems, enableMenuItems } = require('../menu/menu');
const { getWindow } = require('../window');


ipcMain.on('disableMenuItems', () => {
	disableMenuItems();
});

ipcMain.on('enableMenuItems', () => {
	enableMenuItems();
});

ipcMain.on('toggleWindowSize', () => {
	const window = getWindow();
	if (window.isMaximized()) {
		window.unmaximize();
	} else {
		window.maximize();
	}
});
