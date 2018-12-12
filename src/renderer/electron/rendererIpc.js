import { setPreferencesVisibility } from '../redux/actions/appActions';
import {
	setDaySelectedNext,
	setMonthSelectedNext,
	setDateSelectedPrevious,
	setMonthSelectedPrevious
} from '../redux/actions/diaryActions';
import { lock } from '../redux/actions/fileActions';
import store from '../redux/store';

const { ipcRenderer } = window.require('electron');


// Listeners

ipcRenderer.on('lock', () => {
	store.dispatch(lock());
});

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

ipcRenderer.on('showPreferences', () => {
	store.dispatch(setPreferencesVisibility(true));
});


// Senders

export function toggleWindowSize() {
	ipcRenderer.send('toggleWindowSize');
}
