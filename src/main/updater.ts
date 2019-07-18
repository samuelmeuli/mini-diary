import { autoUpdater } from "electron-updater";
import { is } from "electron-util";

/**
 * Check if the app has updates available. If so, download the latest one and notify the user
 */
export default async function updateApp(): Promise<void> {
	// Skip update in MAS build (updates are handled by App Store)
	if (!is.macAppStore) {
		try {
			await autoUpdater.checkForUpdatesAndNotify();
		} catch (e) {
			// Ignore errors thrown because user is not connected to internet
			if (e.message !== "net::ERR_INTERNET_DISCONNECTED") {
				throw e;
			}
		}
	}
}
