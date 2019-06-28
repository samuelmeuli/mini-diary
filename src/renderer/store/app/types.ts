import { Action } from "redux";

// State

export interface AppState {
	allowFutureEntries: boolean;
	overlay: OverlayType;
	theme: Theme;
	themePref: ThemePref;
}

// Action types

export const SET_ALLOW_FUTURE_ENTRIES = "SET_ALLOW_FUTURE_ENTRIES";
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
	| SetOverlayAction
	| SetThemeAction
	| SetThemePrefAction;
