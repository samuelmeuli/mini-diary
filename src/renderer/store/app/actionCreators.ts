import { OverlayType } from "../../../shared/types";
import {
	saveFirstDayOfWeekPref,
	saveFutureEntriesPref,
	saveHideTitlesPref,
	saveThemePref,
	saveSpellcheckPref,
} from "../../files/preferences/preferences";
import { Weekday, Theme, ThemePref } from "../../types";
import { getThemeFromPref } from "../../utils/native-theme";
import { ThunkActionT } from "../store";
import {
	SET_ALLOW_FUTURE_ENTRIES,
	SET_ENABLE_SPELLCHECK,
	SET_HIDE_TITLES,
	SET_FIRST_DAY_OF_WEEK,
	SET_OVERLAY,
	SET_THEME,
	SET_THEME_PREF,
	SetAllowFutureEntriesAction,
	SetEnableSpellcheckAction,
	SetFirstDayOfWeekAction,
	SetOverlayAction,
	SetThemeAction,
	SetThemePrefAction,
	SetHideTitlesAction,
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

function setEnableSpellcheck(enableSpellcheck: boolean): SetEnableSpellcheckAction {
	return {
		type: SET_ENABLE_SPELLCHECK,
		payload: {
			enableSpellcheck,
		},
	};
}

function setHideTitles(hideTitles: boolean): SetHideTitlesAction {
	return {
		type: SET_HIDE_TITLES,
		payload: {
			hideTitles,
		},
	};
}

function setFirstDayOfWeek(firstDayOfWeek: Weekday | null): SetFirstDayOfWeekAction {
	return {
		type: SET_FIRST_DAY_OF_WEEK,
		payload: {
			firstDayOfWeek,
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

export const updateSpellcheckPref = (enableSpellcheck: boolean): ThunkActionT => (
	dispatch,
): void => {
	dispatch(setEnableSpellcheck(enableSpellcheck));
	saveSpellcheckPref(enableSpellcheck);
};

export const updateFutureEntriesPref = (allowFutureEntries: boolean): ThunkActionT => (
	dispatch,
): void => {
	dispatch(setAllowFutureEntries(allowFutureEntries));
	saveFutureEntriesPref(allowFutureEntries);
};

export const updateHideTitlesPref = (hideTitles: boolean): ThunkActionT => (dispatch): void => {
	dispatch(setHideTitles(hideTitles));
	saveHideTitlesPref(hideTitles);
};

export const updateFirstDayOfWeekPref = (firstDayOfWeek: Weekday | null): ThunkActionT => (
	dispatch,
): void => {
	dispatch(setFirstDayOfWeek(firstDayOfWeek));
	saveFirstDayOfWeekPref(firstDayOfWeek);
};

export const updateThemePref = (themePref: ThemePref): ThunkActionT => (dispatch): void => {
	// Apply theme to app
	const theme = getThemeFromPref(themePref);
	dispatch(setTheme(theme));

	// Update theme preference in state and preferences file
	dispatch(setThemePref(themePref));
	saveThemePref(themePref);
};
