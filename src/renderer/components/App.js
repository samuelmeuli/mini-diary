import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImportOverlayContainer from './views/overlays/ImportOverlay/ImportOverlayContainer';
import Preferences from './views/overlays/Preferences/PreferencesContainer';
import Diary from './views/pages/Diary/Diary';
import PasswordCreationContainer from './views/pages/PasswordCreation/PasswordCreationContainer';
import PasswordPromptContainer from './views/pages/PasswordPrompt/PasswordPromptContainer';
import ThemeContext from './ThemeContext';
import { t, toggleWindowSize } from '../electron/ipcRenderer/senders';

const { dialog } = require('electron').remote;

const propTypes = {
	fileExists: PropTypes.bool.isRequired,
	hashedPassword: PropTypes.string.isRequired,
	exportErrorMsg: PropTypes.string.isRequired,
	exportStatus: PropTypes.string.isRequired,
	importErrorMsg: PropTypes.string.isRequired,
	importStatus: PropTypes.string.isRequired,
	showImportOverlay: PropTypes.bool.isRequired,
	showPreferences: PropTypes.bool.isRequired,
	testFileExists: PropTypes.func.isRequired,
	theme: PropTypes.oneOf(['light', 'dark']).isRequired
};

export default class App extends Component {
	static hideSpinningCursor() {
		document.body.style.cursor = 'auto';
	}

	static showSpinningCursor() {
		document.body.style.cursor = 'wait';
	}

	constructor() {
		super();

		this.state = {
			isLoading: true
		};
	}

	componentDidMount() {
		const { testFileExists } = this.props;

		testFileExists();
		this.setState({
			isLoading: false
		});
	}

	componentDidUpdate(prevProps) {
		const { exportErrorMsg, exportStatus, importErrorMsg, importStatus } = this.props;

		// Check for export error and display it if there is one
		if (exportErrorMsg && exportErrorMsg !== prevProps.exportErrorMsg) {
			dialog.showErrorBox('export-error-title', `${t('export-error-msg')}: ${exportErrorMsg}`);
		}

		// Check for import error and display it if there is one
		if (importErrorMsg && importErrorMsg !== prevProps.importErrorMsg) {
			dialog.showErrorBox('import-error-title', `${t('import-error-msg')}: ${importErrorMsg}`);
		}

		// Show loading spinner if necessary
		if (exportStatus !== prevProps.exportStatus) {
			if (exportStatus === 'inProgress') {
				App.showSpinningCursor();
			} else {
				App.hideSpinningCursor();
			}
		}
		if (importStatus !== prevProps.importStatus) {
			if (importStatus === 'inProgress') {
				App.showSpinningCursor();
			} else {
				App.hideSpinningCursor();
			}
		}
	}

	render() {
		const { fileExists, hashedPassword, showImportOverlay, showPreferences, theme } = this.props;
		const { isLoading } = this.state;

		// Render app page
		let page;
		if (isLoading === true) {
			// Looking for diary file
			page = <p>{`${t('loading')}…`}</p>;
		} else if (fileExists === false) {
			// Diary file has not yet been created
			page = <PasswordCreationContainer />;
		} else if (hashedPassword === '') {
			// Diary is locked
			page = <PasswordPromptContainer />;
		} else {
			// Diary is unlocked
			page = <Diary />;
		}

		// Render overlay (e.g. preferences or import dialog) over page if necessary
		let overlay;
		if (showPreferences) {
			overlay = <Preferences isLocked={fileExists === false || hashedPassword === ''} />;
		} else if (showImportOverlay) {
			overlay = <ImportOverlayContainer />;
		}

		return (
			<ThemeContext.Provider value={theme}>
				<div className={`app theme-${theme}`}>
					<header onDoubleClick={toggleWindowSize} />
					{page}
					{overlay}
				</div>
			</ThemeContext.Provider>
		);
	}
}

App.propTypes = propTypes;
