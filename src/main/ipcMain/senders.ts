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

export const exportToJson = (): void => {
	getWindow().webContents.send("exportToJson");
};

export const exportToMd = (): void => {
	getWindow().webContents.send("exportToMd");
};

export const exportToPdf = (): void => {
	getWindow().webContents.send("exportToPdf");
};

export const exportToTxt = (): void => {
	getWindow().webContents.send("exportToTxt");
};

// Import

export const importDayOne = (): void => {
	getWindow().webContents.send("importDayOne");
};

export const importJrnl = (): void => {
	getWindow().webContents.send("importJrnl");
};

export const importJson = (): void => {
	getWindow().webContents.send("importJson");
};

// Lock

export const lock = (): void => {
	getWindow().webContents.send("lock");
};

// Preferences

export const showPref = (): void => {
	getWindow().webContents.send("showPref");
};
