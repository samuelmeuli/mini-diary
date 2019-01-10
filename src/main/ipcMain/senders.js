const { getWindow } = require('../window');


exports.importDayOne = () => {
	getWindow().webContents.send('importDayOne');
};

exports.importJrnl = () => {
	getWindow().webContents.send('importJrnl');
};

exports.importJson = () => {
	getWindow().webContents.send('importJson');
};

exports.lock = () => {
	getWindow().webContents.send('lock');
};

exports.setDaySelectedNext = () => {
	getWindow().webContents.send('nextDay');
};

exports.setDaySelectedPrevious = () => {
	getWindow().webContents.send('previousDay');
};

exports.setMonthSelectedNext = () => {
	getWindow().webContents.send('nextMonth');
};

exports.setMonthSelectedPrevious = () => {
	getWindow().webContents.send('previousMonth');
};

exports.showPreferences = () => {
	getWindow().webContents.send('showPreferences');
};
