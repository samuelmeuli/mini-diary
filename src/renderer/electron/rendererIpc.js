import { setPreferencesVisibility } from '../redux/actions/appActions';
import { lock } from '../redux/actions/fileActions';
import store from '../redux/store';

const { ipcRenderer } = window.require('electron');


// Listeners

ipcRenderer.on('lock', () => {
	store.dispatch(lock());
});

ipcRenderer.on('showPreferences', () => {
	store.dispatch(setPreferencesVisibility(true));
});


// Senders

export function toggleWindowSize() {
	ipcRenderer.send('toggleWindowSize');
}
