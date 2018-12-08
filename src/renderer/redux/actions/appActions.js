// Action creators

export function setTheme(theme) {
	return {
		type: 'SET_THEME',
		payload: {
			theme
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
