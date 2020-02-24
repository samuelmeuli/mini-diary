import { release } from "os";

import { darkMode, is } from "electron-util";
import { gte } from "semver";

import { ThemePref, Theme } from "../types";

// macOS supports dark mode since Mojave (10.14)
const MIN_MACOS_VERSION = "10.14.0";

// Windows supports dark mode since May 2019 update (version 1903 -> build 18362)
const MIN_WINDOWS_VERSION = "10.0.18362";

let supportsNativeThemeCached: boolean;

/**
 * Returns the macOS version which the app is running on
 *
 * Source: `electron-is`
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Tomas Della Vedova
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function getMacosVersion(): string {
	const actual = release().split(".");
	return `10.${parseInt(actual[0], 10) - 4}.${actual[1]}`;
}

/**
 * Returns the Windows version which the app is running on
 */
function getWindowsVersion(): string {
	return release();
}

/**
 * Determines whether the host OS has a native theme option which may be read by Electron
 */
export function supportsNativeTheme(): boolean {
	if (supportsNativeThemeCached === undefined) {
		supportsNativeThemeCached =
			(is.macos && gte(getMacosVersion(), MIN_MACOS_VERSION)) ||
			(is.windows && gte(getWindowsVersion(), MIN_WINDOWS_VERSION));
	}
	return supportsNativeThemeCached;
}

/**
 * Determines the theme to use according to the user's theme preference. If the preference is set to
 * "auto", use the system preference
 */
export function getThemeFromPref(themePref: ThemePref): Theme {
	if (themePref === "auto") {
		// Return native theme
		return darkMode.isEnabled ? "dark" : "light";
	}
	return themePref;
}
