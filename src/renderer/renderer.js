import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './assets/styles/styles.scss';
import AppContainer from './components/AppContainer';
import { initI18n } from './helpers/i18n';
import store from './redux/store';

// Listen to OS events and messages from main process
import './electron/ipcRenderer/listeners';

initI18n();

// Create 'root' div
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// Render React app inside root
ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	root
);
