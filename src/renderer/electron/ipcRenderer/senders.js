const { ipcRenderer } = require('electron');

// Localization

export function getLang() {
	return ipcRenderer.sendSync('getLang');
}

export function getTranslation(i18nKey, ...args) {
	return ipcRenderer.sendSync('getTranslation', i18nKey, ...args);
}

export function getTranslations() {
	return ipcRenderer.sendSync('getTranslations');
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
