import { getTheme } from '../../helpers/preferences';


const theme = getTheme();

function app(state = {
	theme
}, action) {
	switch (action.type) {
		case 'SET_THEME': {
			return {
				...state,
				theme: action.payload.theme
			};
		}
		default:
			return state;
	}
}

export default app;
