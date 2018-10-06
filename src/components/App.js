import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Diary from './views/Diary/Diary';
import { getFilePath } from '../helpers/preferences';
import PasswordCreationContainer from './views/PasswordCreation/PasswordCreationContainer';
import PasswordPromptContainer from './views/PasswordPrompt/PasswordPromptContainer';
import ThemeContext from './ThemeContext';


const propTypes = {
	fileExists: PropTypes.bool.isRequired,
	password: PropTypes.string.isRequired,
	testFileExists: PropTypes.func.isRequired,
	theme: PropTypes.string.isRequired
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
		const { fileExists, password, theme } = this.props;
		const { isLoading } = this.state;
		let page;

		if (isLoading === true) {
			// Looking for diary file
			page = <p>Loading...</p>;
		} else if (fileExists === false) {
			// Diary file has not yet been created
			page = <PasswordCreationContainer />;
		} else if (password === '') {
			// Diary is locked
			page = <PasswordPromptContainer />;
		} else {
			// Diary is unlocked
			page = <Diary />;
		}

		return (
			<ThemeContext.Provider value={theme}>
				<div className={`app theme-${theme}`}>
					{page}
				</div>
			</ThemeContext.Provider>
		);
	}
}

App.propTypes = propTypes;
