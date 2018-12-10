const { ipcMain } = require('electron');
const { getWindow } = require('./window');


// Listeners

ipcMain.on('toggleWindowSize', () => {
	const window = getWindow();
	if (window.isMaximized()) {
		window.unmaximize();
	} else {
		window.maximize();
	}
});


// Senders

exports.sendLock = () => {
	getWindow().webContents.send('lock');
};

exports.showPreferences = () => {
	getWindow().webContents.send('showPreferences');
};
