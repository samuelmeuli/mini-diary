import { getWindow } from "../window";

// Date

export const setDaySelectedNext = (): void => {
	getWindow().webContents.send("nextDay");
};

export const setDaySelectedPrevious = (): void => {
	getWindow().webContents.send("previousDay");
};

export const setMonthSelectedNext = (): void => {
	getWindow().webContents.send("nextMonth");
};

export const setMonthSelectedPrevious = (): void => {
	getWindow().webContents.send("previousMonth");
};

// Export

export const exportJsonMiniDiary = (): void => {
	getWindow().webContents.send("exportJsonMiniDiary");
};

export const exportMd = (): void => {
	getWindow().webContents.send("exportMd");
};

export const exportPdf = (): void => {
	getWindow().webContents.send("exportPdf");
};

export const exportTxtDayOne = (): void => {
	getWindow().webContents.send("exportTxtDayOne");
};

// Import

export const importJsonDayOne = (): void => {
	getWindow().webContents.send("importJsonDayOne");
};

export const importJsonJrnl = (): void => {
	getWindow().webContents.send("importJsonJrnl");
};

export const importJsonMiniDiary = (): void => {
	getWindow().webContents.send("importJsonMiniDiary");
};

export const importTxtDayOne = (): void => {
	getWindow().webContents.send("importTxtDayOne");
};

// Lock

export const lock = (): void => {
	getWindow().webContents.send("lock");
};

// Overlays

export const showPrefOverlay = (): void => {
	getWindow().webContents.send("showPrefOverlay");
};

export const showStatsOverlay = (): void => {
	getWindow().webContents.send("showStatsOverlay");
};
