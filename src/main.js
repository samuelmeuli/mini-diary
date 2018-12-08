const { app, BrowserWindow } = require('electron');
require('electron-debug')();
const {
	default: installExtension,
	REACT_DEVELOPER_TOOLS,
	REDUX_DEVTOOLS
} = require('electron-devtools-installer');
const { getWindow, setWindow } = require('./main/window');

const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];

function onClosed() {
	// Dereference the window
	setWindow(null);
}

function createMainWindow() {
	const window = new BrowserWindow({
		width: 1100,
		height: 600,
		titleBarStyle: 'hiddenInset'
	});
	window.loadURL(`file://${__dirname}/../dist/index.html`);
	window.on('closed', onClosed);

	// Load menu items
	require('./main/menu');

	return window;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!getWindow()) {
		const window = createMainWindow();
		setWindow(window);
	}
});

app.on('ready', () => {
	const window = createMainWindow();
	setWindow(window);

	// Install dev tools
	extensions.forEach((extension) => {
		installExtension(extension)
			.catch(err => console.error('Error installing extension: ', err));
	});
});
