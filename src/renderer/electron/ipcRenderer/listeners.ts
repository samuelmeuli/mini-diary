import { ipcRenderer, remote } from "electron";
import is from "electron-is/is";

import { setPrefVisibility, setTheme } from "../../store/app/actionCreators";
import {
	setDateSelectedPrevious,
	setDaySelectedNext,
	setMonthSelectedNext,
	setMonthSelectedPrevious,
} from "../../store/diary/actionCreators";
import {
	exportToJsonMiniDiary,
	exportToMd,
	exportToPdf,
	exportToTxtDayOne,
} from "../../store/export/actionCreators";
import { lock } from "../../store/file/actionCreators";
import { showImportOverlay } from "../../store/import/actionCreators";
import store, { ThunkDispatchT } from "../../store/store";
import { isAtLeastMojave } from "../../utils/os";
import { getSystemTheme } from "../systemTheme";

const dispatchThunk = store.dispatch as ThunkDispatchT;

function initIpcListeners(): void {
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

	ipcRenderer.on("exportJsonMiniDiary", () => {
		dispatchThunk(exportToJsonMiniDiary());
	});

	ipcRenderer.on("exportMd", () => {
		dispatchThunk(exportToMd());
	});

	ipcRenderer.on("exportPdf", () => {
		dispatchThunk(exportToPdf());
	});

	ipcRenderer.on("exportTxtDayOne", () => {
		dispatchThunk(exportToTxtDayOne());
	});

	// Import

	ipcRenderer.on("importJsonDayOne", () => {
		dispatchThunk(showImportOverlay("jsonDayOne"));
	});

	ipcRenderer.on("importJsonJrnl", () => {
		dispatchThunk(showImportOverlay("jsonJrnl"));
	});

	ipcRenderer.on("importJsonMiniDiary", () => {
		dispatchThunk(showImportOverlay("jsonMiniDiary"));
	});

	ipcRenderer.on("importTxtDayOne", () => {
		dispatchThunk(showImportOverlay("txtDayOne"));
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
		remote.powerMonitor.on("lock-screen", () => {
			dispatchThunk(lock());
		});
	}

	// Theme
	// Listen to system theme changes and update the app theme accordingly

	if (is.macOS() && isAtLeastMojave()) {
		remote.systemPreferences.subscribeNotification("AppleInterfaceThemeChangedNotification", () => {
			const theme = getSystemTheme();
			dispatchThunk(setTheme(theme));
		});
	}
}

export default initIpcListeners;
