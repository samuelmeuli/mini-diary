import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { moveFile } from '../../../../helpers/fileAccess';
import { isMac } from '../../../../helpers/platform';
import {
	FILE_NAME,
	getFilePath as getFilePathPref,
	setFileDir as setFileDirPref,
	setTheme as setThemePref
} from '../../../../helpers/preferences';
import Banner from '../../../elements/Banner';
import Overlay from '../Overlay';

const { dialog } = window.require('electron').remote;


const propTypes = {
	isLocked: PropTypes.bool.isRequired,
	testFileExists: PropTypes.func.isRequired,
	theme: PropTypes.oneOf(['light', 'dark']).isRequired,
	setPreferencesVisibility: PropTypes.func.isRequired,
	setTheme: PropTypes.func.isRequired,
	updatePassword: PropTypes.func.isRequired
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
		this.selectDir = this.selectDir.bind(this);
		this.selectMoveDir = this.selectMoveDir.bind(this);
		this.setTheme = this.setTheme.bind(this);
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

	setThemeDark() {
		this.setTheme('dark');
	}

	setThemeLight() {
		this.setTheme('light');
	}

	selectDir() {
		const { testFileExists } = this.props;

		// Show dialog for selecting directory
		const fileDirArray = dialog.showOpenDialog({
			buttonLabel: 'Select directory',
			properties: ['openDirectory']
		});

		if (fileDirArray && fileDirArray.length === 1) {
			// Use mini-diary.txt file from selected directory
			const newDir = fileDirArray[0];
			setFileDirPref(newDir);
			testFileExists();
			this.setState({
				fileDir: getFilePathPref()
			});
		}
	}

	selectMoveDir() {
		const { fileDir } = this.state;

		// Show dialog for selecting directory
		const fileDirArray = dialog.showOpenDialog({
			buttonLabel: 'Move diary file',
			properties: ['openDirectory']
		});

		if (fileDirArray && fileDirArray.length === 1) {
			// Move mini-diary.txt file to selected directory
			const newDir = fileDirArray[0];
			try {
				moveFile(fileDir, `${newDir}/${FILE_NAME}`);
			} catch (err) {
				dialog.showErrorBox(
					'Move error', `An error occurred when moving the file: ${err.message}`
				);
				return;
			}
			setFileDirPref(newDir);
			this.setState({
				fileDir: getFilePathPref()
			});
		}
	}

	updatePassword() {
		const { updatePassword } = this.props;
		const { password1, password2 } = this.state;

		if (password1 === password2) {
			updatePassword(password1);
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
					{
						/* Theme */
						!isMac
							&& (
								<fieldset className="fieldset-theme">
									<legend>Theme</legend>
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
							)
					}

					{
						/*
							File directory
							When locked: Change directory
							When unlocked: Move diary file and change directory
						 */
					}
					<fieldset className="fieldset-file-dir">
						<legend>Diary file</legend>
						<p>{fileDir}</p>
						<button
							type="button"
							className="button button-main"
							onClick={isLocked ? this.selectDir : this.selectMoveDir}
						>
							{isLocked ? 'Change directory' : 'Move diary file'}
						</button>
					</fieldset>

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
										Change password
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
