import { BrowserWindow } from "electron";

let window: BrowserWindow; // Prevent window from being garbage collected

export function getWindow(): BrowserWindow {
	return window;
}

export function setWindow(w: BrowserWindow): void {
	window = w;
}
