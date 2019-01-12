const { app, BrowserWindow } = require('electron');
require('electron-debug')();
const { autoUpdater } = require('electron-updater');

const { getWindow, setWindow } = require('./main/window');


function onClosed() {
	// Dereference the window
	setWindow(null);
}

function createMainWindow() {
	const window = new BrowserWindow({
		width: 1100,
		height: 600,
		show: false,
		titleBarStyle: 'hiddenInset',
		webPreferences: {
			nodeIntegration: true
		}
	});
	window.loadURL(`file://${__dirname}/index.html`);
	window.once('ready-to-show', () => {
		window.show();
	});
	window.on('closed', onClosed);

	// Load listeners and menu items
	require('./main/ipcMain/listeners');
	require('./main/menu/menu');

	return window;
}

function run() {
	const window = createMainWindow();
	setWindow(window);
	autoUpdater.checkForUpdatesAndNotify();
}

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (!getWindow()) {
		run();
	}
});

app.on('ready', () => {
	run();
});
