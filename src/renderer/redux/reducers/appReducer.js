import { loadThemePref } from '../../helpers/preferences';
import { getSystemTheme } from '../../electron/systemTheme';

const themePref = loadThemePref();
const theme = themePref === 'auto' ? getSystemTheme() : themePref;

function app(
	state = {
		theme, // One of ['light', 'dark']
		themePref, // One of ['auto', 'light', 'dark']
		showPreferences: false
	},
	action
) {
	switch (action.type) {
		case 'SET_THEME': {
			return {
				...state,
				theme: action.payload.theme
			};
		}
		case 'SET_THEME_PREF': {
			return {
				...state,
				themePref: action.payload.themePref
			};
		}
		case 'SET_PREFERENCES_VISIBILITY': {
			return {
				...state,
				showPreferences: action.payload.showPreferences
			};
		}
		default:
			return state;
	}
}

export default app;
