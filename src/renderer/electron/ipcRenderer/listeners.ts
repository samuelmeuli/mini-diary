import is from "electron-is";

import { setPrefVisibility, setTheme } from "../../store/app/actionCreators";
import {
	setDaySelectedNext,
	setMonthSelectedNext,
	setDateSelectedPrevious,
	setMonthSelectedPrevious,
} from "../../store/diary/actionCreators";
import {
	exportToJson,
	exportToMd,
	exportToPdf,
	exportToTxt,
} from "../../store/export/actionCreators";
import { lock } from "../../store/file/actionCreators";
import { showImportOverlay } from "../../store/import/actionCreators";
import store, { ThunkDispatchT } from "../../store/store";
import { isAtLeastMojave } from "../../utils/os";
import { getSystemTheme } from "../systemTheme";

const { ipcRenderer } = require("electron");
const { powerMonitor, systemPreferences } = require("electron").remote;

const dispatchThunk = store.dispatch as ThunkDispatchT;

// Date

ipcRenderer.on("nextDay", () => {
	dispatchThunk(setDaySelectedNext());
});

ipcRenderer.on("nextMonth", () => {
	dispatchThunk(setMonthSelectedNext());
});

ipcRenderer.on("previousDay", () => {
	dispatchThunk(setDateSelectedPrevious());
});

ipcRenderer.on("previousMonth", () => {
	dispatchThunk(setMonthSelectedPrevious());
});

// Export

ipcRenderer.on("exportToJson", () => {
	dispatchThunk(exportToJson());
});

ipcRenderer.on("exportToMd", () => {
	dispatchThunk(exportToMd());
});

ipcRenderer.on("exportToPdf", () => {
	dispatchThunk(exportToPdf());
});

ipcRenderer.on("exportToTxt", () => {
	dispatchThunk(exportToTxt());
});

// Import

ipcRenderer.on("importDayOne", () => {
	dispatchThunk(showImportOverlay("dayOne"));
});

ipcRenderer.on("importJrnl", () => {
	dispatchThunk(showImportOverlay("jrnl"));
});

ipcRenderer.on("importJson", () => {
	dispatchThunk(showImportOverlay("json"));
});

// Lock

ipcRenderer.on("lock", () => {
	dispatchThunk(lock());
});

// Preferences

ipcRenderer.on("showPref", () => {
	dispatchThunk(setPrefVisibility(true));
});

// Screen lock
// Lock diary when screen is locked

if (is.macOS() || is.windows()) {
	powerMonitor.on("lock-screen", () => {
		dispatchThunk(lock());
	});
}

// Theme
// Listen to system theme changes and update the app theme accordingly

if (is.macOS() && isAtLeastMojave()) {
	systemPreferences.subscribeNotification("AppleInterfaceThemeChangedNotification", () => {
		const theme = getSystemTheme();
		dispatchThunk(setTheme(theme));
	});
}
