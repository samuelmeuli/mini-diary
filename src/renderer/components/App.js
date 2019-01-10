import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Diary from './views/pages/Diary/Diary';
import PasswordCreationContainer from './views/pages/PasswordCreation/PasswordCreationContainer';
import PasswordPromptContainer from './views/pages/PasswordPrompt/PasswordPromptContainer';
import Preferences from './views/overlays/Preferences/PreferencesContainer';
import ThemeContext from './ThemeContext';
import { toggleWindowSize } from '../electron/ipcRenderer/senders';
import { getSystemTheme } from '../electron/systemTheme';
import ImportOverlay from './views/overlays/ImportOverlay/ImportOverlayContainer';

const { dialog } = window.require('electron').remote;


const propTypes = {
	fileExists: PropTypes.bool.isRequired,
	hashedPassword: PropTypes.string.isRequired,
	importErrorMsg: PropTypes.string.isRequired,
	showImportOverlay: PropTypes.bool.isRequired,
	showPreferences: PropTypes.bool.isRequired,
	testFileExists: PropTypes.func.isRequired,
	theme: PropTypes.oneOf(['auto', 'light', 'dark']).isRequired
};

export default class App extends Component {
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
		const { importErrorMsg } = this.props;

		// Check for import error and display it if there is one
		if (importErrorMsg && importErrorMsg !== prevProps.importErrorMsg) {
			dialog.showErrorBox(
				'Import error', `An error occurred during the import: ${importErrorMsg}`
			);
		}
	}

	render() {
		const {
			fileExists,
			hashedPassword,
			showImportOverlay,
			showPreferences,
			theme: themePref
		} = this.props;
		const { isLoading } = this.state;
		let page;

		if (isLoading === true) {
			// Looking for diary file
			page = <p>Loading…</p>;
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

		// Determine theme ('light', 'dark', or system theme if 'auto')
		const theme = themePref === 'auto' ? getSystemTheme() : themePref;

		// Render overlay (e.g. preferences or import dialog) over page if necessary
		let overlay;
		if (showPreferences) {
			overlay = <Preferences isLocked={fileExists === false || hashedPassword === ''} />;
		} else if (showImportOverlay) {
			overlay = <ImportOverlay />;
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
