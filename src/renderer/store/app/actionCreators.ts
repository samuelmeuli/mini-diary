import { getSystemTheme } from "../../electron/systemTheme";
import { saveThemePref } from "../../files/preferences/preferences";
import { ThunkActionT } from "../store";
import {
	SET_PREF_VISIBILITY,
	SET_THEME,
	SET_THEME_PREF,
	SetPrefVisibilityAction,
	SetThemeAction,
	SetThemePrefAction,
} from "./types";

// Action creators

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

export const updateThemePref = (themePref: ThemePref): ThunkActionT => dispatch => {
	// Apply theme to app
	const theme = themePref === "auto" ? getSystemTheme() : themePref;
	dispatch(setTheme(theme));

	// Update theme preference in state and preferences file
	dispatch(setThemePref(themePref));
	saveThemePref(themePref);
};
