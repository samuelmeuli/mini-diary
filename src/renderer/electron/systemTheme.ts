import { remote } from "electron";
import is from "electron-is";

import { isAtLeastMojave } from "../utils/os";

export function getSystemTheme(): Theme {
	if (is.macOS() && isAtLeastMojave()) {
		return remote.systemPreferences.isDarkMode() ? "dark" : "light";
	}
	throw Error("System themes are not supported on this platform");
}
