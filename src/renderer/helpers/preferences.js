import is from 'electron-is';
import { isAtLeastMojave } from './os';

const { app } = window.require('electron').remote;
const settings = window.require('electron-settings');

const DEFAULT_THEME = 'light';
const PREF_DIR = app.getPath('userData');

// Diary file

/**
 * Return the preference for the directory in which the diary file is saved
 */
export function loadDirPref() {
	// Get path of file directory (or set it to default)
	let fileDir;
	if (settings.has('filePath')) {
		fileDir = settings.get('filePath');
	} else {
		fileDir = PREF_DIR;
		settings.set('filePath', fileDir);
	}
	return fileDir;
}

/**
 * Update the diary directory preference
 */
export function saveDirPref(filePath) {
	settings.set('filePath', filePath);
}

// Theme

/**
 * Return the theme preference (one of ['auto', 'light', 'dark'])
 * When set to 'auto', the system theme will be used
 */
export function loadThemePref() {
	let theme;
	if (settings.has('theme')) {
		theme = settings.get('theme');
	} else {
		if (is.macOS() && isAtLeastMojave()) {
			// On macOS Mojave and later: Use system theme
			theme = 'auto';
		} else {
			// On Windows, Linux, and macOS before Mojave: use default theme
			theme = DEFAULT_THEME;
		}
		settings.set('theme', theme);
	}
	return theme;
}

/**
 * Update the theme preference (one of ['auto', 'light', 'dark'])
 */
export function saveThemePref(theme) {
	settings.set('theme', theme);
}
