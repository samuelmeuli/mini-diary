import { isMac } from '../helpers/platform';

const { systemPreferences } = window.require('electron').remote;


export function getSystemTheme() {
	if (isMac) {
		return systemPreferences.isDarkMode() ? 'dark' : 'light';
	}
	throw Error('System themes are not supported on this platform');
}
