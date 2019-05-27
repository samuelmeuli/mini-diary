import { Action } from "redux";

// State

export interface AppState {
	allowFutureEntries: boolean;
	theme: Theme;
	themePref: ThemePref;
	showPref: boolean;
}

// Action types

export const SET_ALLOW_FUTURE_ENTRIES = "SET_ALLOW_FUTURE_ENTRIES";
export const SET_THEME = "SET_THEME";
export const SET_THEME_PREF = "SET_THEME_PREF";
export const SET_PREF_VISIBILITY = "SET_PREF_VISIBILITY";

// Actions

export interface SetAllowFutureEntriesAction extends Action {
	type: typeof SET_ALLOW_FUTURE_ENTRIES;
	payload: {
		allowFutureEntries: boolean;
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

export interface SetPrefVisibilityAction extends Action {
	type: typeof SET_PREF_VISIBILITY;
	payload: {
		showPref: boolean;
	};
}

export type AppAction =
	| SetAllowFutureEntriesAction
	| SetThemeAction
	| SetThemePrefAction
	| SetPrefVisibilityAction;
