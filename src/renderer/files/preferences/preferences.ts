import { remote } from "electron";

import settings from "electron-settings";

import { JsonValue } from "../../../shared/types";
import { ThemePref, Weekday } from "../../types";
import { supportsNativeTheme } from "../../utils/native-theme";

const DEFAULT_ALLOW_FUTURE_ENTRIES = false;
const DEFAULT_FIRST_DAY_OF_WEEK = null; // Let the system locale determine the first day of the week
const DEFAULT_HIDE_TITLES = false;
const DEFAULT_ENABLE_SPELLCHECK = true;
const DEFAULT_THEME_PREF: ThemePref = "light";
const PREF_DIR = remote.app.getPath("userData");

/**
 * Return value for specified preference. If not set, save and return the provided default value
 */
function getPref<T extends JsonValue>(prefName: string, defaultValue: T): T {
	let value: T;
	if (settings.has(prefName)) {
		value = settings.get(prefName) as T;
	} else {
		value = defaultValue;
		settings.set(prefName, value);
	}
	return value;
}

/**
 * Update the specified preference's value
 */
function setPref(prefName: string, value: JsonValue): void {
	settings.set(prefName, value);
}

// Diary file

/**
 * Return the preference for the directory in which the diary file is saved
 */
export function loadDirPref(): string {
	return getPref("filePath", PREF_DIR);
}

/**
 * Update the diary directory preference
 */
export function saveDirPref(filePath: string): void {
	setPref("filePath", filePath);
}

// First day of the week

/**
 * Return the preference for the first day of the week
 */
export function loadFirstDayOfWeekPref(): Weekday | null {
	return getPref("firstDayOfWeek", DEFAULT_FIRST_DAY_OF_WEEK);
}

/**
 * Update the preference for the first day of the week
 */
export function saveFirstDayOfWeekPref(firstDayOfWeek: Weekday | null): void {
	setPref("firstDayOfWeek", firstDayOfWeek);
}

// Future entries

/**
 * Return the preference for whether diary entries can be written for days in the future
 */
export function loadFutureEntriesPref(): boolean {
	return getPref("allowFutureEntries", DEFAULT_ALLOW_FUTURE_ENTRIES);
}

/**
 * Update the future entries preference
 */
export function saveFutureEntriesPref(allowFutureEntries: boolean): void {
	setPref("allowFutureEntries", allowFutureEntries);
}

// Hide titles of diary entries

/**
 * Return the preference for whether titles are hidden for diary entries
 */
export function loadHideTitlesPref(): boolean {
	return getPref("hideTitles", DEFAULT_HIDE_TITLES);
}

/**
 * Update the preference for hiding diary entry titles
 */
export function saveHideTitlesPref(hideTitles: boolean): void {
	setPref("hideTitles", hideTitles);
}

// Spellcheck

/**
 * Return the preference for whether spellcheck should be enabled/disabled
 */
export function loadSpellcheckPref(): boolean {
	return getPref("enableSpellcheck", DEFAULT_ENABLE_SPELLCHECK);
}

/**
 * Update the preference for enabling/disabling spellcheck
 */
export function saveSpellcheckPref(enableSpellcheck: boolean): void {
	setPref("enableSpellcheck", enableSpellcheck);
}

// Theme

/**
 * Return the theme preference (one of ['auto', 'light', 'dark'])
 * When set to 'auto', the system theme will be used
 */
export function loadThemePref(): ThemePref {
	const defaultPref = supportsNativeTheme() ? "auto" : DEFAULT_THEME_PREF;
	return getPref("theme", defaultPref);
}

/**
 * Update the theme preference (one of ['auto', 'light', 'dark'])
 */
export function saveThemePref(themePref: ThemePref): void {
	setPref("theme", themePref);
}
