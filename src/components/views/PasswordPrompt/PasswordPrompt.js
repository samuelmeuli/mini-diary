import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { getFilePath } from '../../../helpers/preferences';
import Banner from '../../elements/Banner';
import PageCentered from '../PageCentered';


const propTypes = {
	decrypt: PropTypes.func.isRequired,
	decryptStatus: PropTypes.string.isRequired
};

export default class PasswordPrompt extends PureComponent {
	constructor() {
		super();

		this.state = {
			password: ''
		};

		// Function bindings
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			password: e.target.value
		});
	}

	/**
	 * Test decrypting the diary file with the provided password. On success, save the password and
	 * the decrypted diary entries to the Redux store. Otherwise, throw an error
	 */
	onSubmit(e) {
		e.preventDefault();

		const { decrypt } = this.props;
		const { password } = this.state;
		const filePath = getFilePath();

		decrypt(filePath, password);
	}

	render() {
		const { decryptStatus } = this.props;
		const { password } = this.state;

		return (
			<PageCentered>
				<form className="password-prompt-form" onSubmit={this.onSubmit}>
					<input
						type="password"
						value={password}
						onChange={this.onChange}
						placeholder="Password"
						autoFocus
						required
					/>
					<button type="submit" className="button button-main">
						Unlock
					</button>
				</form>
				{
					decryptStatus === 'error'
						&& <Banner type="error" message="Incorrect password" />
				}
			</PageCentered>
		);
	}
}

PasswordPrompt.propTypes = propTypes;
