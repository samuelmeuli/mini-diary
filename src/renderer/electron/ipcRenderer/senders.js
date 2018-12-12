const { ipcRenderer } = window.require('electron');


export function disableMenuItems() {
	ipcRenderer.send('disableMenuItems');
}

export function enableMenuItems() {
	ipcRenderer.send('enableMenuItems');
}

export function toggleWindowSize() {
	ipcRenderer.send('toggleWindowSize');
}
