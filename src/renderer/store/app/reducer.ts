import { loadFutureEntriesPref, loadThemePref } from "../../files/preferences/preferences";
import { getThemeFromPref } from "../../utils/native-theme";
import {
	AppAction,
	AppState,
	SET_ALLOW_FUTURE_ENTRIES,
	SET_OVERLAY,
	SET_THEME,
	SET_THEME_PREF,
} from "./types";

const allowFutureEntries = loadFutureEntriesPref();
const themePref = loadThemePref();
const theme = getThemeFromPref(themePref);

const initialState: AppState = {
	allowFutureEntries,
	overlay: "none",
	theme,
	themePref,
};

function appReducer(state = initialState, action: AppAction): AppState {
	switch (action.type) {
		case SET_ALLOW_FUTURE_ENTRIES: {
			return {
				...state,
				allowFutureEntries: action.payload.allowFutureEntries,
			};
		}
		case SET_OVERLAY: {
			return {
				...state,
				overlay: action.payload.overlay,
			};
		}
		case SET_THEME: {
			return {
				...state,
				theme: action.payload.theme,
			};
		}
		case SET_THEME_PREF: {
			return {
				...state,
				themePref: action.payload.themePref,
			};
		}
		default:
			return state;
	}
}

export default appReducer;
