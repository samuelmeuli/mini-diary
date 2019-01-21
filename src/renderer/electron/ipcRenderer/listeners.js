import is from 'electron-is';

import { setPreferencesVisibility, setTheme } from '../../redux/actions/appActions';
import {
	setDaySelectedNext,
	setMonthSelectedNext,
	setDateSelectedPrevious,
	setMonthSelectedPrevious
} from '../../redux/actions/diaryActions';
import {
	exportToJson,
	exportToMd,
	exportToPdf,
	exportToTxt
} from '../../redux/actions/exportActions';
import { lock } from '../../redux/actions/fileActions';
import { showImportOverlay } from '../../redux/actions/importActions';
import store from '../../redux/store';
import { getSystemTheme } from '../systemTheme';

const { ipcRenderer } = window.require('electron');
const { powerMonitor, systemPreferences } = window.require('electron').remote;


// Export

ipcRenderer.on('exportToJson', () => {
	store.dispatch(exportToJson());
});

ipcRenderer.on('exportToMd', () => {
	store.dispatch(exportToMd());
});

ipcRenderer.on('exportToPdf', () => {
	store.dispatch(exportToPdf());
});

ipcRenderer.on('exportToTxt', () => {
	store.dispatch(exportToTxt());
});


// Import

ipcRenderer.on('importDayOne', () => {
	store.dispatch(showImportOverlay('dayOne'));
});

ipcRenderer.on('importJrnl', () => {
	store.dispatch(showImportOverlay('jrnl'));
});

ipcRenderer.on('importJson', () => {
	store.dispatch(showImportOverlay('json'));
});


// Lock

ipcRenderer.on('lock', () => {
	store.dispatch(lock());
});


// Date

ipcRenderer.on('nextDay', () => {
	store.dispatch(setDaySelectedNext());
});

ipcRenderer.on('nextMonth', () => {
	store.dispatch(setMonthSelectedNext());
});

ipcRenderer.on('previousDay', () => {
	store.dispatch(setDateSelectedPrevious());
});

ipcRenderer.on('previousMonth', () => {
	store.dispatch(setMonthSelectedPrevious());
});


// Preferences

ipcRenderer.on('showPreferences', () => {
	store.dispatch(setPreferencesVisibility(true));
});


// Screen lock
// Lock diary when screen is locked

if (is.macOS() || is.windows()) {
	powerMonitor.on('lock-screen', () => {
		store.dispatch(lock());
	});
}


// Theme
// Listen to system theme changes and update the app theme accordingly

if (is.macOS()) {
	systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
		const theme = getSystemTheme();
		store.dispatch(setTheme(theme));
	});
}
