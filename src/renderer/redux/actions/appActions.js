import is from 'electron-is';

import { isAtLeastMojave } from '../../helpers/os';
import { saveThemePref } from '../../helpers/preferences';
import { getSystemTheme } from '../../electron/systemTheme';

const THEME_PREFS_DEFAULT = ['light', 'dark'];
const THEME_PREFS_WITH_AUTO = ['auto', 'light', 'dark'];

// Action creators

export function setTheme(theme) {
	return {
		type: 'SET_THEME',
		payload: {
			theme
		}
	};
}

export function setThemePref(themePref) {
	return {
		type: 'SET_THEME_PREF',
		payload: {
			themePref
		}
	};
}

export function setPreferencesVisibility(showPreferences) {
	return {
		type: 'SET_PREFERENCES_VISIBILITY',
		payload: {
			showPreferences
		}
	};
}

// Thunks

export function updateThemePref(themePref) {
	return dispatch => {
		// Validation of `themePref` parameter
		const possibleOptions =
			is.macOS() && isAtLeastMojave() ? THEME_PREFS_WITH_AUTO : THEME_PREFS_DEFAULT;
		if (!possibleOptions.includes(themePref)) {
			throw Error(`themeOption must be one of ${possibleOptions}`);
		}

		// Apply theme to app
		const theme = themePref === 'auto' ? getSystemTheme() : themePref;
		dispatch(setTheme(theme));

		// Update theme preference in state and preferences file
		dispatch(setThemePref(themePref));
		saveThemePref(themePref);
	};
}
