import { OverlayType } from "../../../shared/types";
import {
	saveFirstDayOfWeekPref,
	saveFutureEntriesPref,
	saveDisableTitlesPref,
	saveThemePref,
} from "../../files/preferences/preferences";
import { Weekday, Theme, ThemePref } from "../../types";
import { getThemeFromPref } from "../../utils/native-theme";
import { ThunkActionT } from "../store";
import {
	SET_ALLOW_FUTURE_ENTRIES,
	SET_DISABLE_TITLES,
	SET_FIRST_DAY_OF_WEEK,
	SET_OVERLAY,
	SET_THEME,
	SET_THEME_PREF,
	SetAllowFutureEntriesAction,
	SetFirstDayOfWeekAction,
	SetOverlayAction,
	SetThemeAction,
	SetThemePrefAction,
	SetDisableTitlesAction,
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

function setDisableTitles(disableTitles: boolean): SetDisableTitlesAction {
	return {
		type: SET_DISABLE_TITLES,
		payload: {
			disableTitles,
		}
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

export const updateFutureEntriesPref = (allowFutureEntries: boolean): ThunkActionT => (
	dispatch,
): void => {
	dispatch(setAllowFutureEntries(allowFutureEntries));
	saveFutureEntriesPref(allowFutureEntries);
};

export const updateDisableTitlesPref = (disableTitles: boolean): ThunkActionT => (
	dispatch,
): void => {
	dispatch(setDisableTitles(disableTitles));
	saveDisableTitlesPref(disableTitles);
}

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
