/* eslint-disable global-require */

import { app, BrowserWindow } from "electron";
import contextMenu from "electron-context-menu";
import electronDebug from "electron-debug";
import { autoUpdater } from "electron-updater";

import initIpcListeners from "./ipcMain/listeners";
import { initMenu } from "./menu/menu";
import { getWindow, setWindow } from "./window";

electronDebug();
contextMenu();

function onClosed(): void {
	// Dereference the window
	setWindow(null);
}

function createMainWindow(): BrowserWindow {
	const window = new BrowserWindow({
		width: 1100,
		height: 600,
		show: false,
		titleBarStyle: "hiddenInset",
		webPreferences: {
			nodeIntegration: true,
		},
	});
	window.loadURL(`file://${__dirname}/index.html`);
	window.once("ready-to-show", () => {
		window.show();
	});
	window.on("closed", onClosed);

	// Set up IPC and menu items
	initIpcListeners();
	initMenu();

	return window;
}

function run(): void {
	const window = createMainWindow();
	setWindow(window);
	autoUpdater.checkForUpdatesAndNotify();
}

app.on("window-all-closed", () => {
	app.quit();
});

app.on("activate", () => {
	if (!getWindow()) {
		run();
	}
});

app.on("ready", () => {
	run();
});
