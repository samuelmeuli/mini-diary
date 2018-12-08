const { getWindow } = require('./window');

exports.sendLock = () => {
	getWindow().webContents.send('lock');
};

exports.showPreferences = () => {
	getWindow().webContents.send('showPreferences');
};
