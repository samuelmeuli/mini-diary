import { getSystemTheme } from "../../electron/systemTheme";
import { loadFutureEntriesPref, loadThemePref } from "../../files/preferences/preferences";
import {
	AppAction,
	AppState,
	SET_ALLOW_FUTURE_ENTRIES,
	SET_PREF_VISIBILITY,
	SET_THEME,
	SET_THEME_PREF,
} from "./types";

const allowFutureEntries = loadFutureEntriesPref();
const themePref = loadThemePref();
const theme = themePref === "auto" ? getSystemTheme() : themePref;

const initialState: AppState = {
	allowFutureEntries,
	theme,
	themePref,
	showPref: false,
};

function appReducer(state = initialState, action: AppAction): AppState {
	switch (action.type) {
		case SET_ALLOW_FUTURE_ENTRIES: {
			return {
				...state,
				allowFutureEntries: action.payload.allowFutureEntries,
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
		case SET_PREF_VISIBILITY: {
			return {
				...state,
				showPref: action.payload.showPref,
			};
		}
		default:
			return state;
	}
}

export default appReducer;
