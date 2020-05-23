import {
	loadFirstDayOfWeekPref,
	loadSpellcheckPref,
	loadFutureEntriesPref,
	loadThemePref,
	loadHideTitlesPref,
} from "../../files/preferences/preferences";
import { getThemeFromPref } from "../../utils/native-theme";
import {
	AppAction,
	AppState,
	SET_ALLOW_FUTURE_ENTRIES,
	SET_ENABLE_SPELLCHECK,
	SET_FIRST_DAY_OF_WEEK,
	SET_OVERLAY,
	SET_THEME,
	SET_THEME_PREF,
	SET_HIDE_TITLES,
} from "./types";

const themePref = loadThemePref();
const theme = getThemeFromPref(themePref);

const initialState: AppState = {
	allowFutureEntries: loadFutureEntriesPref(),
	enableSpellcheck: loadSpellcheckPref(),
	firstDayOfWeek: loadFirstDayOfWeekPref(),
	hideTitles: loadHideTitlesPref(),
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
		case SET_ENABLE_SPELLCHECK: {
			return {
				...state,
				enableSpellcheck: action.payload.enableSpellcheck,
			};
		}
		case SET_HIDE_TITLES: {
			return {
				...state,
				hideTitles: action.payload.hideTitles,
			};
		}
		case SET_FIRST_DAY_OF_WEEK: {
			return {
				...state,
				firstDayOfWeek: action.payload.firstDayOfWeek,
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
