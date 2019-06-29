import { darkMode } from "electron-util";

/**
 * Determine the theme to use according to the user's theme preference. If the preference is set to
 * "auto", use the system preference
 */
export default function getThemeFromPref(themePref: ThemePref): Theme {
	if (themePref === "auto") {
		return darkMode.isEnabled ? "dark" : "light";
	}
	return themePref;
}
