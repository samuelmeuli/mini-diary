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
