import { ipcRenderer, remote } from "electron";
import is from "electron-is/is";

import { openOverlay, setTheme } from "../../store/app/actionCreators";
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
import { setImportFormat } from "../../store/import/actionCreators";
import store, { ThunkDispatchT } from "../../store/store";
import { isAtLeastMojave } from "../../utils/os";
import { getSystemTheme } from "../systemTheme";

const dispatchThunk = store.dispatch as ThunkDispatchT;

function initIpcListeners(): void {
	// Date

	ipcRenderer.on("nextDay", (): void => {
		dispatchThunk(setDaySelectedNext());
	});

	ipcRenderer.on("nextMonth", (): void => {
		dispatchThunk(setMonthSelectedNext());
	});

	ipcRenderer.on("previousDay", (): void => {
		dispatchThunk(setDateSelectedPrevious());
	});

	ipcRenderer.on("previousMonth", (): void => {
		dispatchThunk(setMonthSelectedPrevious());
	});

	// Export

	ipcRenderer.on("exportJsonMiniDiary", (): void => {
		dispatchThunk(exportToJsonMiniDiary());
	});

	ipcRenderer.on("exportMd", (): void => {
		dispatchThunk(exportToMd());
	});

	ipcRenderer.on("exportPdf", (): void => {
		dispatchThunk(exportToPdf());
	});

	ipcRenderer.on("exportTxtDayOne", (): void => {
		dispatchThunk(exportToTxtDayOne());
	});

	// Import

	ipcRenderer.on("importJsonDayOne", (): void => {
		dispatchThunk(setImportFormat("jsonDayOne"));
		dispatchThunk(openOverlay("import"));
	});

	ipcRenderer.on("importJsonJrnl", (): void => {
		dispatchThunk(setImportFormat("jsonJrnl"));
		dispatchThunk(openOverlay("import"));
	});

	ipcRenderer.on("importJsonMiniDiary", (): void => {
		dispatchThunk(setImportFormat("jsonMiniDiary"));
		dispatchThunk(openOverlay("import"));
	});

	ipcRenderer.on("importTxtDayOne", (): void => {
		dispatchThunk(setImportFormat("txtDayOne"));
		dispatchThunk(openOverlay("import"));
	});

	// Lock

	ipcRenderer.on("lock", (): void => {
		dispatchThunk(lock());
	});

	// Preferences

	ipcRenderer.on("showPrefOverlay", (): void => {
		dispatchThunk(openOverlay("preferences"));
	});

	// Screen lock
	// Lock diary when screen is locked

	if (is.macOS() || is.windows()) {
		remote.powerMonitor.on("lock-screen", (): void => {
			dispatchThunk(lock());
		});
	}

	// Theme
	// Listen to system theme changes and update the app theme accordingly

	if (is.macOS() && isAtLeastMojave()) {
		remote.systemPreferences.subscribeNotification(
			"AppleInterfaceThemeChangedNotification",
			(): void => {
				const theme = getSystemTheme();
				dispatchThunk(setTheme(theme));
			},
		);
	}
}

export default initIpcListeners;
