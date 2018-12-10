const { systemPreferences } = window.require('electron').remote;


export function supportsSystemTheme() {
	return process.platform === 'darwin';
}


export function getSystemTheme() {
	if (supportsSystemTheme()) {
		return systemPreferences.isDarkMode() ? 'dark' : 'light';
	}
	throw Error('System themes are not supported on this platform');
}
