import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getFilePath } from '../../../helpers/preferences';
import PageCentered from '../PageCentered';


const propTypes = {
	createEncryptedFile: PropTypes.func.isRequired,
	testFileExists: PropTypes.func.isRequired
};

export default class PasswordCreation extends Component {
	constructor() {
		super();

		this.state = {
			password1: '',
			password2: '',
			passwordsMatch: false
		};

		// Function bindings
		this.onChangePassword1 = this.onChangePassword1.bind(this);
		this.onChangePassword2 = this.onChangePassword2.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChangePassword1(e) {
		const password1 = e.target.value;
		const { password2 } = this.state;

		this.setState({
			password1,
			passwordsMatch: password1 === password2
		});
	}

	onChangePassword2(e) {
		const password2 = e.target.value;
		const { password1 } = this.state;

		this.setState({
			password2,
			passwordsMatch: password1 === password2
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const { createEncryptedFile, testFileExists } = this.props;
		const { password1, password2 } = this.state;
		const filePath = getFilePath();

		if (password1 === password2) {
			createEncryptedFile(filePath, password1);
			testFileExists(filePath);
		} else {
			throw Error('Passwords do not match');
		}
	}

	render() {
		const { passwordsMatch, password1, password2 } = this.state;

		return (
			<PageCentered>
				<p>Please choose a password for your diary.</p>
				<p>
					Make sure to write this password down. If you forget it, you will no longer be able to
					access your diary entries.
				</p>
				<form onSubmit={this.onSubmit}>
					<input
						type="password"
						value={password1}
						onChange={this.onChangePassword1}
						placeholder="password"
						autoFocus
						required
					/>
					<input
						type="password"
						value={password2}
						onChange={this.onChangePassword2}
						placeholder="password"
						required
					/>
					{
						password1 && password2 && !passwordsMatch
						&& <p>Passwords do not match</p>
					}
					<button type="submit" disabled={!passwordsMatch}>Save</button>
				</form>
			</PageCentered>
		);
	}
}

PasswordCreation.propTypes = propTypes;
