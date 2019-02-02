const { ipcRenderer } = require('electron');

// Localization

export function getLang() {
	return ipcRenderer.sendSync('getLang');
}

export function t(i18nKey, ...args) {
	return ipcRenderer.sendSync('translate', i18nKey, ...args);
}

// Menu items

export function disableMenuItems() {
	ipcRenderer.send('disableMenuItems');
}

export function enableMenuItems() {
	ipcRenderer.send('enableMenuItems');
}

// Window

export function toggleWindowSize() {
	ipcRenderer.send('toggleWindowSize');
}
