import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Diary from './views/Diary/Diary';
import { getFilePath } from '../helpers/preferences';
import PasswordCreationContainer from './views/PasswordCreation/PasswordCreationContainer';
import PasswordPromptContainer from './views/PasswordPrompt/PasswordPromptContainer';
import Preferences from './views/Preferences/PreferencesContainer';
import ThemeContext from './ThemeContext';
import { getSystemTheme } from '../electron/systemTheme';


const propTypes = {
	fileExists: PropTypes.bool.isRequired,
	hashedPassword: PropTypes.string.isRequired,
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
		const filePath = getFilePath();

		testFileExists(filePath);
		this.setState({
			isLoading: false
		});
	}

	render() {
		const { fileExists, hashedPassword, showPreferences, theme: themePref } = this.props;
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

		return (
			<ThemeContext.Provider value={theme}>
				<div className={`app theme-${theme}`}>
					<header />
					{page}
					{
						showPreferences
							&& <Preferences isLocked={fileExists === false || hashedPassword === ''} />
					}
				</div>
			</ThemeContext.Provider>
		);
	}
}

App.propTypes = propTypes;
