import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './components/AppContainer';
import store from './redux/store';
import './styles/styles.scss';


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
