import { remote } from "electron";

const window = remote.getCurrentWindow();

/**
 * Maximize/unmaximize the current window
 */
export function toggleWindowSize(): void {
	if (window.isMaximized()) {
		window.unmaximize();
	} else {
		window.maximize();
	}
}
