const { ipcRenderer } = window.require('electron');


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
