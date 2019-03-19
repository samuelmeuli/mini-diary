import is from "electron-is";

import { isAtLeastMojave } from "../utils/os";

const { systemPreferences } = require("electron").remote;

export function getSystemTheme(): Theme {
	if (is.macOS() && isAtLeastMojave()) {
		return systemPreferences.isDarkMode() ? "dark" : "light";
	}
	throw Error("System themes are not supported on this platform");
}
