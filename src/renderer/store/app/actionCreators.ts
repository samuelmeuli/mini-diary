import { getSystemTheme } from "../../electron/systemTheme";
import { saveFutureEntriesPref, saveThemePref } from "../../files/preferences/preferences";
import { ThunkActionT } from "../store";
import {
	SetAllowFutureEntriesAction,
	SetPrefVisibilityAction,
	SetThemeAction,
	SetThemePrefAction,
	SET_ALLOW_FUTURE_ENTRIES,
	SET_PREF_VISIBILITY,
	SET_THEME,
	SET_THEME_PREF,
} from "./types";

// Action creators

function setAllowFutureEntries(allowFutureEntries: boolean): SetAllowFutureEntriesAction {
	return {
		type: SET_ALLOW_FUTURE_ENTRIES,
		payload: {
			allowFutureEntries,
		},
	};
}

export function setTheme(theme: Theme): SetThemeAction {
	return {
		type: SET_THEME,
		payload: {
			theme,
		},
	};
}

export function setThemePref(themePref: ThemePref): SetThemePrefAction {
	return {
		type: SET_THEME_PREF,
		payload: {
			themePref,
		},
	};
}

export function setPrefVisibility(showPref: boolean): SetPrefVisibilityAction {
	return {
		type: SET_PREF_VISIBILITY,
		payload: {
			showPref,
		},
	};
}

// Thunks

export const updateFutureEntriesPref = (allowFutureEntries: boolean): ThunkActionT => (
	dispatch,
): void => {
	dispatch(setAllowFutureEntries(allowFutureEntries));
	saveFutureEntriesPref(allowFutureEntries);
};

export const updateThemePref = (themePref: ThemePref): ThunkActionT => (dispatch): void => {
	// Apply theme to app
	const theme = themePref === "auto" ? getSystemTheme() : themePref;
	dispatch(setTheme(theme));

	// Update theme preference in state and preferences file
	dispatch(setThemePref(themePref));
	saveThemePref(themePref);
};
