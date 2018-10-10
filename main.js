/* eslint import/no-extraneous-dependencies: 0 */

const { app, BrowserWindow } = require('electron');
require('electron-debug')();
const {
	default: installExtension,
	REACT_DEVELOPER_TOOLS,
	REDUX_DEVTOOLS
} = require('electron-devtools-installer');

let mainWindow; // Prevent window from being garbage collected
const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];

function onClosed() {
	// Dereference the window
	mainWindow = null;
}

function createMainWindow() {
	const window = new BrowserWindow({
		width: 900,
		height: 500
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

	// Install dev tools
	extensions.forEach((extension) => {
		installExtension(extension)
			.then(name => console.log(`Added extension "${name}"`))
			.catch(err => console.error('Error installing extension: ', err));
	});
});
