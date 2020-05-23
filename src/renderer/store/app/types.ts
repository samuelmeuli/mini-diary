import { Action } from "redux";

import { OverlayType } from "../../../shared/types";
import { Weekday, Theme, ThemePref } from "../../types";

// State

export interface AppState {
	allowFutureEntries: boolean;
	enableSpellcheck: boolean;
	firstDayOfWeek: Weekday | null;
	hideTitles: boolean;
	overlay: OverlayType;
	theme: Theme;
	themePref: ThemePref;
}

// Action types

export const SET_ALLOW_FUTURE_ENTRIES = "SET_ALLOW_FUTURE_ENTRIES";
export const SET_ENABLE_SPELLCHECK = "SET_ENABLE_SPELLCHECK";
export const SET_FIRST_DAY_OF_WEEK = "SET_FIRST_DAY_OF_WEEK";
export const SET_HIDE_TITLES = "SET_HIDE_TITLES";
export const SET_OVERLAY = "SET_OVERLAY";
export const SET_THEME = "SET_THEME";
export const SET_THEME_PREF = "SET_THEME_PREF";

// Actions

export interface SetAllowFutureEntriesAction extends Action {
	type: typeof SET_ALLOW_FUTURE_ENTRIES;
	payload: {
		allowFutureEntries: boolean;
	};
}

export interface SetEnableSpellcheckAction extends Action {
	type: typeof SET_ENABLE_SPELLCHECK;
	payload: {
		enableSpellcheck: boolean;
	};
}

export interface SetFirstDayOfWeekAction extends Action {
	type: typeof SET_FIRST_DAY_OF_WEEK;
	payload: {
		firstDayOfWeek: Weekday | null;
	};
}

export interface SetHideTitlesAction extends Action {
	type: typeof SET_HIDE_TITLES;
	payload: {
		hideTitles: boolean;
	};
}

export interface SetOverlayAction extends Action {
	type: typeof SET_OVERLAY;
	payload: {
		overlay: OverlayType;
	};
}

export interface SetThemeAction extends Action {
	type: typeof SET_THEME;
	payload: {
		theme: Theme;
	};
}

export interface SetThemePrefAction extends Action {
	type: typeof SET_THEME_PREF;
	payload: {
		themePref: ThemePref;
	};
}

export type AppAction =
	| SetAllowFutureEntriesAction
	| SetEnableSpellcheckAction
	| SetFirstDayOfWeekAction
	| SetHideTitlesAction
	| SetOverlayAction
	| SetThemeAction
	| SetThemePrefAction;
