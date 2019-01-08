import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
	getFilePath as getFilePathPref,
	setFileDir as setFileDirPref,
	setTheme as setThemePref
} from '../../../helpers/preferences';
import Banner from '../../elements/Banner';
import Overlay from '../Overlay';
import { supportsSystemTheme } from '../../../electron/systemTheme';

const { dialog } = window.require('electron').remote;


const propTypes = {
	createEncryptedFile: PropTypes.func.isRequired,
	isLocked: PropTypes.bool.isRequired,
	testFileExists: PropTypes.func.isRequired,
	theme: PropTypes.oneOf(['auto', 'light', 'dark']).isRequired,
	setPreferencesVisibility: PropTypes.func.isRequired,
	setTheme: PropTypes.func.isRequired
};

export default class Preferences extends PureComponent {
	constructor() {
		super();

		this.state = {
			fileDir: getFilePathPref(),
			password1: '',
			password2: ''
		};

		// Function bindings
		this.onChangePassword1 = this.onChangePassword1.bind(this);
		this.onChangePassword2 = this.onChangePassword2.bind(this);
		this.hidePreferences = this.hidePreferences.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.selectFileDir = this.selectFileDir.bind(this);
		this.setTheme = this.setTheme.bind(this);
		this.setThemeAuto = this.setThemeAuto.bind(this);
		this.setThemeDark = this.setThemeDark.bind(this);
		this.setThemeLight = this.setThemeLight.bind(this);
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

	setTheme(theme) {
		const { setTheme } = this.props;

		setThemePref(theme);
		setTheme(theme);
	}

	setThemeAuto() {
		this.setTheme('auto');
	}

	setThemeDark() {
		this.setTheme('dark');
	}

	setThemeLight() {
		this.setTheme('light');
	}

	selectFileDir() {
		const { testFileExists } = this.props;

		// Show dialog for selecting directory
		const fileDirArray = dialog.showOpenDialog({
			properties: ['openDirectory']
		});

		if (fileDirArray && fileDirArray.length === 1) {
			// Use mini-diary.txt file from selected directory
			setFileDirPref(fileDirArray[0]);
			testFileExists();
			this.setState({
				fileDir: getFilePathPref()
			});
		}
	}

	updatePassword() {
		const { createEncryptedFile, testFileExists } = this.props;
		const { password1, password2 } = this.state;

		if (password1 === password2) {
			createEncryptedFile(password1);
			testFileExists();
			this.setState({
				password1: '',
				password2: ''
			});
		} else {
			throw Error('Passwords do not match');
		}
	}

	hidePreferences() {
		const { setPreferencesVisibility } = this.props;

		setPreferencesVisibility(false);
	}

	render() {
		const { isLocked, theme } = this.props;
		const { fileDir, password1, password2 } = this.state;

		const passwordsMatch = password1 === password2;

		return (
			<Overlay onClose={this.hidePreferences}>
				<h1>Preferences</h1>
				<form className="preferences-form">
					{/* Theme */}
					<fieldset className="fieldset-theme">
						<legend>Theme</legend>
						{
							supportsSystemTheme()
								&& (
									<label htmlFor="radio-theme-auto">
										<input
											type="radio"
											name="radio-theme-auto"
											id="radio-theme-auto"
											className="radio"
											checked={theme === 'auto'}
											onChange={this.setThemeAuto}
										/>
										Auto
									</label>
								)
						}
						<label htmlFor="radio-theme-light">
							<input
								type="radio"
								name="radio-theme-light"
								id="radio-theme-light"
								className="radio"
								checked={theme === 'light'}
								onChange={this.setThemeLight}
							/>
							Light
						</label>
						<label htmlFor="radio-theme-dark">
							<input
								type="radio"
								name="radio-theme-dark"
								id="radio-theme-dark"
								className="radio"
								checked={theme === 'dark'}
								onChange={this.setThemeDark}
							/>
							Dark
						</label>
					</fieldset>

					{
						/* File directory (only when locked) */
						isLocked
							&& (
								<fieldset className="fieldset-file-dir">
									<legend>Diary file</legend>
									<p>{fileDir}</p>
									<button type="button" className="button button-main" onClick={this.selectFileDir}>
										Select directory
									</button>
								</fieldset>
							)
					}

					{
						/* Password (only when unlocked) */
						!isLocked
							&& (
								<fieldset className="fieldset-password">
									<legend>Password</legend>
									<input
										type="password"
										value={password1}
										placeholder="New password"
										required
										onChange={this.onChangePassword1}
									/>
									<input
										type="password"
										value={password2}
										placeholder="Repeat new password"
										required
										onChange={this.onChangePassword2}
									/>
									<button
										type="button"
										disabled={!password1 || !password2 || !passwordsMatch}
										onClick={this.updatePassword}
										className="button button-main"
									>
										Update password
									</button>
									<div className="password-update-banner">
										{
											password1 && password2 && !passwordsMatch
												&& (
													<Banner type="error" message="Passwords do not match" />
												)
										}
									</div>
								</fieldset>
							)
					}
				</form>
			</Overlay>
		);
	}
}

Preferences.propTypes = propTypes;
