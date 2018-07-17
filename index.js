const electron = require('electron');

const app = electron.app;

require('electron-debug')();

// Prevent window from being garbage collected
let mainWindow;

function onClosed() {
	// Dereference the window
	mainWindow = null;
}

function createMainWindow() {
	const window = new electron.BrowserWindow({
		width: 600,
		height: 400
	});

	window.loadURL(`file://${__dirname}/dist/index.html`);
	window.on('closed', onClosed);

	return window;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
