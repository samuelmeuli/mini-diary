import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Diary from './Diary/Diary';
import { getFilePath } from '../helpers/preferences';
import PasswordCreationContainer from './PasswordCreation/PasswordCreationContainer';
import PasswordPromptContainer from './PasswordPrompt/PasswordPromptContainer';


const propTypes = {
	fileExists: PropTypes.bool.isRequired,
	password: PropTypes.string.isRequired,
	testFileExists: PropTypes.func.isRequired
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
		const { fileExists, password } = this.props;
		const { isLoading } = this.state;

		// Looking for diary file
		if (isLoading === true) {
			return <p>Loading...</p>;
		}

		// Diary file has not yet been created
		if (fileExists === false) {
			return <PasswordCreationContainer />;
		}

		// Diary is locked
		if (password === '') {
			return <PasswordPromptContainer />;
		}

		// Diary is unlocked
		return <Diary />;
	}
}

App.propTypes = propTypes;
