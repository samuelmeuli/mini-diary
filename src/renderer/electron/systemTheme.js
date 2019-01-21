import is from 'electron-is';

const { systemPreferences } = window.require('electron').remote;


export function getSystemTheme() {
	if (is.macOS()) {
		return systemPreferences.isDarkMode() ? 'dark' : 'light';
	}
	throw Error('System themes are not supported on this platform');
}
