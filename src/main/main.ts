import { app, BrowserWindow } from "electron";
import contextMenu from "electron-context-menu";
import electronDebug from "electron-debug";
import { autoUpdater } from "electron-updater";
import { enforceMacOSAppLocation } from "electron-util";
import path from "path";

import initReportDialog from "../shared/reportDialog";
import { initI18n } from "./i18n/i18n";
import initIpcListeners from "./ipcMain/listeners";
import { buildMenu } from "./menu/menu";
import { getWindow, setWindow } from "./window";

initReportDialog();
electronDebug();
contextMenu();

async function createWindow(): Promise<BrowserWindow> {
	const win = new BrowserWindow({
		width: 1100,
		minWidth: 400,
		height: 600,
		minHeight: 500,
		show: false,
		titleBarStyle: "hiddenInset",
		webPreferences: {
			nodeIntegration: true,
		},
	});
	win.on("ready-to-show", (): void => {
		win.show();
	});
	win.on("closed", (): void => {
		// Dereference the window
		// @ts-ignore
		setWindow(null);
	});

	// Load HTML file
	await win.loadFile(path.join(__dirname, "index.html"));

	return win;
}

// Quit app when all of its windows have been closed
app.on("window-all-closed", (): void => {
	app.quit();
});

// On app activation (e.g. when clicking dock icon), re-create BrowserWindow if necessary
app.on(
	"activate",
	async (): Promise<void> => {
		if (!getWindow()) {
			setWindow(await createWindow());
		}
	},
);

(async (): Promise<void> => {
	// Wait for Electron to be initialized
	await app.whenReady();

	// macOS: Prompt user to move app if it's outside the "Applications" folder
	enforceMacOSAppLocation();

	// Set up translations, messaging between main and renderer processes, and application menu
	initI18n();
	buildMenu();
	initIpcListeners();

	// Create and show BrowserWindow
	setWindow(await createWindow());

	// Check if app has updates available. If so, download latest one and notify user
	autoUpdater.checkForUpdatesAndNotify();
})();
