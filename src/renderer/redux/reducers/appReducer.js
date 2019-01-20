import { getTheme } from '../../helpers/preferences';


const theme = getTheme();

function app(state = {
	theme, // One of ['light', 'dark']
	showPreferences: false
}, action) {
	switch (action.type) {
		case 'SET_THEME': {
			return {
				...state,
				theme: action.payload.theme
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
