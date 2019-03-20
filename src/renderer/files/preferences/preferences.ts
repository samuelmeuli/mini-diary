import { remote } from "electron";
import is from "electron-is";
import settings from "electron-settings";

import { isAtLeastMojave } from "../../utils/os";

const DEFAULT_THEME_PREF: ThemePref = "light";
const PREF_DIR = remote.app.getPath("userData");

// Diary file

/**
 * Return the preference for the directory in which the diary file is saved
 */
export function loadDirPref(): string {
	// Get path of file directory (or set it to default)
	let fileDir: string;
	if (settings.has("filePath")) {
		fileDir = settings.get("filePath") as string;
	} else {
		fileDir = PREF_DIR;
		settings.set("filePath", fileDir);
	}
	return fileDir;
}

/**
 * Update the diary directory preference
 */
export function saveDirPref(filePath: string): void {
	settings.set("filePath", filePath);
}

// Theme

/**
 * Return the theme preference (one of ['auto', 'light', 'dark'])
 * When set to 'auto', the system theme will be used
 */
export function loadThemePref(): ThemePref {
	let themePref: ThemePref;
	if (settings.has("theme")) {
		themePref = settings.get("theme") as ThemePref;
	} else {
		if (is.macOS() && isAtLeastMojave()) {
			// On macOS Mojave and later: Use system theme
			themePref = "auto";
		} else {
			// On Windows, Linux, and macOS before Mojave: use default theme
			themePref = DEFAULT_THEME_PREF;
		}
		settings.set("theme", themePref);
	}
	return themePref;
}

/**
 * Update the theme preference (one of ['auto', 'light', 'dark'])
 */
export function saveThemePref(themePref: ThemePref): void {
	settings.set("theme", themePref);
}
