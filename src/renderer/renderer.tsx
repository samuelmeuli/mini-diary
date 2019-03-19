import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./assets/styles/styles.scss";
import AppContainer from "./components/AppContainer";
import store from "./store/store";
import { initI18n } from "./utils/i18n";

// Listen to OS events and messages from main process
import "./electron/ipcRenderer/listeners";

initI18n();

// Create 'root' div
const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

// Render React app inside root
ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	root,
);
