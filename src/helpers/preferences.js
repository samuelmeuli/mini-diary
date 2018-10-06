const { app } = window.require('electron').remote;
const settings = window.require('electron-settings');
const path = require('path');


const FILE_NAME = 'minidiary.txt';


export function getFilePath() {
	// Get path of file directory (or set it to default)
	let fileDir;
	if (settings.has('filePath')) {
		fileDir = settings.get('filePath');
	} else {
		fileDir = app.getPath('documents');
		settings.set('filePath', fileDir);
	}
	// Concatenate directory path with file name and return it
	return path.resolve(fileDir, FILE_NAME);
}

export function setFilePath(filePath) {
	settings.set('filePath', filePath);
}

export function getTheme() {
	let theme;
	if (settings.has('theme')) {
		theme = settings.get('theme');
	} else {
		theme = 'dark';
		settings.set('theme', 'dark');
	}
	return theme;
}

export function setTheme(theme) {
	if (theme !== 'light' && theme !== 'dark') {
		throw Error('Theme setting must either be "light" or "dark');
	}
	settings.set('theme', theme);
}
