import logger from "electron-log";
import { autoUpdater } from "electron-updater";
import { is } from "electron-util";

autoUpdater.logger = logger;

/**
 * Check if the app has updates available. If so, download the latest one and notify the user
 */
export default async function updateApp(): Promise<void> {
	// Skip update in MAS build (updates are handled by App Store)
	if (!is.macAppStore) {
		try {
			await autoUpdater.checkForUpdatesAndNotify();
		} catch (err) {
			// Ignore errors thrown because user is not connected to internet
			if (err.message !== "net::ERR_INTERNET_DISCONNECTED") {
				throw err;
			}
		}
	}
}
