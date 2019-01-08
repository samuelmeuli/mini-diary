import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Banner from '../../elements/Banner';
import PageCentered from '../PageCentered';


const propTypes = {
	createEncryptedFile: PropTypes.func.isRequired,
	testFileExists: PropTypes.func.isRequired
};

export default class PasswordCreation extends PureComponent {
	constructor() {
		super();

		this.state = {
			password1: '',
			password2: ''
		};

		// Function bindings
		this.onChangePassword1 = this.onChangePassword1.bind(this);
		this.onChangePassword2 = this.onChangePassword2.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChangePassword1(e) {
		const password1 = e.target.value;

		this.setState({
			password1
		});
	}

	onChangePassword2(e) {
		const password2 = e.target.value;

		this.setState({
			password2
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const { createEncryptedFile, testFileExists } = this.props;
		const { password1, password2 } = this.state;

		if (password1 === password2) {
			createEncryptedFile(password1);
			testFileExists();
		} else {
			throw Error('Passwords do not match');
		}
	}

	render() {
		const { password1, password2 } = this.state;

		const passwordsMatch = password1 === password2;

		return (
			<PageCentered>
				<p>Please choose a password for your diary.</p>
				<form className="password-creation-form" onSubmit={this.onSubmit}>
					<input
						type="password"
						value={password1}
						placeholder="Password"
						autoFocus
						required
						onChange={this.onChangePassword1}
					/>
					<input
						type="password"
						value={password2}
						placeholder="Repeat password"
						required
						onChange={this.onChangePassword2}
					/>
					<button
						type="submit"
						disabled={!password1 || !password2 || !passwordsMatch}
						className="button button-main"
					>
						Set password
					</button>
				</form>
				<div className="password-creation-banner">
					{
						password1 && password2 && !passwordsMatch
							&& <Banner type="error" message="Passwords do not match" />
					}
				</div>
			</PageCentered>
		);
	}
}

PasswordCreation.propTypes = propTypes;
