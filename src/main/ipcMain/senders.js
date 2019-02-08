const { getWindow } = require('../window');

// Date

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

// Export

exports.exportToJson = () => {
	getWindow().webContents.send('exportToJson');
};

exports.exportToMd = () => {
	getWindow().webContents.send('exportToMd');
};

exports.exportToPdf = () => {
	getWindow().webContents.send('exportToPdf');
};

exports.exportToTxt = () => {
	getWindow().webContents.send('exportToTxt');
};

// Import

exports.importDayOne = () => {
	getWindow().webContents.send('importDayOne');
};

exports.importJrnl = () => {
	getWindow().webContents.send('importJrnl');
};

exports.importJson = () => {
	getWindow().webContents.send('importJson');
};

// Lock

exports.lock = () => {
	getWindow().webContents.send('lock');
};

// Preferences

exports.showPreferences = () => {
	getWindow().webContents.send('showPreferences');
};
