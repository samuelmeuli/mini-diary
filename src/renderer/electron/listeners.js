import store from '../redux/store';
import { setTheme } from '../redux/actions/appActions';
import { getSystemTheme } from './systemTheme';

const { systemPreferences } = window.require('electron').remote;


systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
	const theme = getSystemTheme();
	store.dispatch(setTheme(theme));
});
