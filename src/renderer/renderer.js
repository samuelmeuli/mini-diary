import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';

import AppContainer from './components/AppContainer';
import { getLang } from './electron/ipcRenderer/senders';
import store from './redux/store';
import './assets/styles/styles.scss';

// Listen to OS events and messages from main process
import './electron/ipcRenderer/listeners';

// Set moment.js language
moment.locale(getLang());

// Create 'root' div
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// Render react app inside root
ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	root
);
