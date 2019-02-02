import is from 'electron-is';

import { isAtLeastMojave } from '../helpers/os';

const { systemPreferences } = require('electron').remote;

export function getSystemTheme() {
	if (is.macOS() && isAtLeastMojave()) {
		return systemPreferences.isDarkMode() ? 'dark' : 'light';
	}
	throw Error('System themes are not supported on this platform');
}
