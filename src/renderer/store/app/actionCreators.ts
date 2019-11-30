import { saveFutureEntriesPref, saveThemePref } from "../../files/preferences/preferences";
import getThemeFromPref from "../../utils/theme";
import { ThunkActionT } from "../store";
import {
	SET_ALLOW_FUTURE_ENTRIES,
	SET_OVERLAY,
	SET_THEME,
	SET_THEME_PREF,
	SetAllowFutureEntriesAction,
	SetOverlayAction,
	SetThemeAction,
	SetThemePrefAction,
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

export function closeOverlay(): SetOverlayAction {
	return {
		type: SET_OVERLAY,
		payload: {
			overlay: "none",
		},
	};
}

export function openOverlay(overlay: OverlayType): SetOverlayAction {
	return {
		type: SET_OVERLAY,
		payload: {
			overlay,
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

// Thunks

export const updateFutureEntriesPref = (allowFutureEntries: boolean): ThunkActionT => (
	dispatch,
): void => {
	dispatch(setAllowFutureEntries(allowFutureEntries));
	saveFutureEntriesPref(allowFutureEntries);
};

export const updateThemePref = (themePref: ThemePref): ThunkActionT => (dispatch): void => {
	// Apply theme to app
	const theme = getThemeFromPref(themePref);
	dispatch(setTheme(theme));

	// Update theme preference in state and preferences file
	dispatch(setThemePref(themePref));
	saveThemePref(themePref);
};
