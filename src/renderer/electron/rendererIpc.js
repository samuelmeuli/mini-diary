import { setPreferencesVisibility } from '../redux/actions/appActions';
import { lock } from '../redux/actions/fileActions';
import store from '../redux/store';

const { ipcRenderer } = window.require('electron');


ipcRenderer.on('lock', () => {
	store.dispatch(lock());
});

ipcRenderer.on('showPreferences', () => {
	store.dispatch(setPreferencesVisibility(true));
});
