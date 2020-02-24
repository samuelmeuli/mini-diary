import { ipcRenderer, remote } from "electron";

import { darkMode, is } from "electron-util";

import { OverlayType } from "../../../shared/types";
import { openOverlay, setTheme } from "../../store/app/actionCreators";
import {
	setDaySelectedPrevious,
	setDaySelectedNext,
	setDaySelectedToday,
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

const dispatchThunk = store.dispatch as ThunkDispatchT;

export default function initIpcListeners(): void {
	// Date

	ipcRenderer.on("nextDay", (): void => {
		dispatchThunk(setDaySelectedNext());
	});

	ipcRenderer.on("previousDay", (): void => {
		dispatchThunk(setDaySelectedPrevious());
	});

	ipcRenderer.on("goToToday", (): void => {
		dispatchThunk(setDaySelectedToday());
	});

	ipcRenderer.on("nextMonth", (): void => {
		dispatchThunk(setMonthSelectedNext());
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

	// Overlays

	ipcRenderer.on("openOverlay", (_, overlayType: OverlayType): void => {
		dispatchThunk(openOverlay(overlayType));
	});

	// Screen lock
	// Lock diary when screen is locked

	if (is.macos || is.windows) {
		remote.powerMonitor.on("lock-screen", (): void => {
			dispatchThunk(lock());
		});
	}

	// Theme
	// Listen to system theme changes and update the app theme accordingly

	darkMode.onChange((): void => {
		dispatchThunk(setTheme(darkMode.isEnabled ? "dark" : "light"));
	});
}
