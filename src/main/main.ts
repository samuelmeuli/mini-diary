import { app, BrowserWindow } from "electron";
import contextMenu from "electron-context-menu";
import electronDebug from "electron-debug";
import path from "path";

import initReportDialog from "../shared/reportDialog";
import { initI18n } from "./i18n/i18n";
import initIpcListeners from "./ipcMain/listeners";
import { buildMenu } from "./menu/menu";
import updateApp from "./updater";
import { getWindow, setWindow } from "./window";

initReportDialog();
electronDebug();
contextMenu();

async function createWindow(): Promise<BrowserWindow> {
	const win = new BrowserWindow({
		width: 1100,
		minWidth: 500,
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

	// Set up translations, messaging between main and renderer processes, and application menu
	initI18n();
	buildMenu();
	initIpcListeners();

	// Create and show BrowserWindow
	setWindow(await createWindow());

	updateApp();
})();
