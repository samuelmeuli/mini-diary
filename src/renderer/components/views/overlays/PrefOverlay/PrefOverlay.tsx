import { remote } from "electron";
import { is } from "electron-util";
import React, { ChangeEvent, PureComponent, ReactNode } from "react";

import { FILE_NAME, getDiaryFilePath } from "../../../../files/diary/diaryFile";
import { moveFile } from "../../../../files/fileAccess";
import { saveDirPref } from "../../../../files/preferences/preferences";
import { translations } from "../../../../utils/i18n";
import { isAtLeastMojave } from "../../../../utils/os";
import Banner from "../../../elements/Banner";
import OverlayContainer from "../OverlayContainer";

export interface StateProps {
	allowFutureEntries: boolean;
	fileExists: boolean;
	hashedPassword: string;
	themePref: ThemePref;
}

export interface DispatchProps {
	resetDiary: () => void;
	testFileExists: () => void;
	updateFutureEntriesPref: (allowFutureEntries: boolean) => void;
	updatePassword: (newPassword: string) => void;
	updateThemePref: (themePref: ThemePref) => void;
}

type Props = StateProps & DispatchProps;

interface State {
	fileDir: string;
	password1: string;
	password2: string;
}

export default class PrefOverlay extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			fileDir: getDiaryFilePath(),
			password1: "",
			password2: "",
		};

		// Function bindings
		this.onChangePassword1 = this.onChangePassword1.bind(this);
		this.onChangePassword2 = this.onChangePassword2.bind(this);
		this.selectDir = this.selectDir.bind(this);
		this.selectMoveDir = this.selectMoveDir.bind(this);
		this.setThemePrefAuto = this.setThemePrefAuto.bind(this);
		this.setThemePrefDark = this.setThemePrefDark.bind(this);
		this.setThemePrefLight = this.setThemePrefLight.bind(this);
		this.showResetPrompt = this.showResetPrompt.bind(this);
		this.toggleAllowFutureEntries = this.toggleAllowFutureEntries.bind(this);
		this.updateDir = this.updateDir.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
	}

	onChangePassword1(e: ChangeEvent<HTMLInputElement>): void {
		const password1 = e.target.value;

		this.setState({
			password1,
		});
	}

	onChangePassword2(e: ChangeEvent<HTMLInputElement>): void {
		const password2 = e.target.value;

		this.setState({
			password2,
		});
	}

	setThemePrefAuto(): void {
		const { updateThemePref } = this.props;

		updateThemePref("auto");
	}

	setThemePrefDark(): void {
		const { updateThemePref } = this.props;

		updateThemePref("dark");
	}

	setThemePrefLight(): void {
		const { updateThemePref } = this.props;

		updateThemePref("light");
	}

	selectDir(): void {
		const { testFileExists } = this.props;

		// Show dialog for selecting directory
		const fileDirArray = remote.dialog.showOpenDialog({
			buttonLabel: translations["select-directory"],
			properties: ["openDirectory"],
		});

		if (fileDirArray && fileDirArray.length === 1) {
			// Use mini-diary.txt file from selected directory
			const newDir = fileDirArray[0];
			this.updateDir(newDir);
			testFileExists();
		}
	}

	selectMoveDir(): void {
		const { fileDir } = this.state;

		// Show dialog for selecting directory
		const fileDirArray = remote.dialog.showOpenDialog({
			buttonLabel: translations["move-file"],
			properties: ["openDirectory"],
		});

		if (fileDirArray && fileDirArray.length === 1) {
			// Move mini-diary.txt file to selected directory
			const newDir = fileDirArray[0];
			try {
				moveFile(fileDir, `${newDir}/${FILE_NAME}`);
			} catch (err) {
				remote.dialog.showErrorBox(
					translations["move-error-title"],
					`${translations["move-error-msg"]}: ${err.message}`,
				);
				return;
			}
			this.updateDir(newDir);
		}
	}

	showResetPrompt(): void {
		const { resetDiary, testFileExists } = this.props;

		// Show warning prompt asking whether user really wants to reset
		const clickIndex = remote.dialog.showMessageBox({
			type: "warning",
			buttons: [translations["reset-diary-confirm"], translations.no],
			defaultId: 1,
			title: translations["reset-diary"],
			message: translations["reset-diary-msg"],
		});

		// If confirm button was clicked: Delete diary and show lock screen
		if (clickIndex === 0) {
			resetDiary();
			testFileExists();
		}
	}

	toggleAllowFutureEntries(): void {
		const { allowFutureEntries, updateFutureEntriesPref } = this.props;

		updateFutureEntriesPref(!allowFutureEntries);
	}

	updateDir(dir: string): void {
		saveDirPref(dir);
		this.setState({
			fileDir: getDiaryFilePath(),
		});
	}

	updatePassword(): void {
		const { updatePassword } = this.props;
		const { password1, password2 } = this.state;

		if (password1 === password2) {
			updatePassword(password1);
			this.setState({
				password1: "",
				password2: "",
			});
		} else {
			throw Error(translations["passwords-no-match"]);
		}
	}

	render(): ReactNode {
		const { allowFutureEntries, fileExists, hashedPassword, themePref } = this.props;
		const { fileDir, password1, password2 } = this.state;

		const isLocked = hashedPassword === "";
		const passwordsMatch = password1 === password2;

		return (
			<OverlayContainer className="pref-overlay">
				<h1>{translations.preferences}</h1>
				<form className="preferences-form">
					{/* Theme */}
					<fieldset className="fieldset-theme">
						<legend>{translations.theme}</legend>
						<div className="fieldset-content">
							{is.macos && isAtLeastMojave() && (
								<label htmlFor="radio-theme-auto">
									<input
										type="radio"
										name="radio-theme-auto"
										id="radio-theme-auto"
										className="radio"
										checked={themePref === "auto"}
										onChange={this.setThemePrefAuto}
									/>
									{translations.auto}
								</label>
							)}
							<label htmlFor="radio-theme-light">
								<input
									type="radio"
									name="radio-theme-light"
									id="radio-theme-light"
									className="radio"
									checked={themePref === "light"}
									onChange={this.setThemePrefLight}
								/>
								{translations.light}
							</label>
							<label htmlFor="radio-theme-dark">
								<input
									type="radio"
									name="radio-theme-dark"
									id="radio-theme-dark"
									className="radio"
									checked={themePref === "dark"}
									onChange={this.setThemePrefDark}
								/>
								{translations.dark}
							</label>
						</div>
					</fieldset>
					{/* Future diary entries (only when unlocked) */
					!isLocked && (
						<fieldset className="fieldset-future-entries">
							<legend>{translations["diary-entries"]}</legend>
							<div className="fieldset-content">
								<label htmlFor="checkbox-future-entries">
									<input
										type="checkbox"
										name="checkbox-future-entries"
										id="checkbox-future-entries"
										className="checkbox"
										checked={allowFutureEntries}
										onChange={this.toggleAllowFutureEntries}
									/>
									{translations["allow-future-entries"]}
								</label>
							</div>
						</fieldset>
					)}
					<fieldset className="fieldset-file-dir">
						<legend>{translations["diary-file"]}</legend>
						<div className="fieldset-content">
							{/*
								File directory
								When locked: Change directory
								When unlocked: Move diary file and change directory
								Not accessible in MAS build due to sandboxing (would not be able to reopen the diary
								file without an open dialog after changing the diary path)
							*/
							!is.macAppStore && (
								<>
									<p className="file-dir">{fileDir}</p>
									<button
										type="button"
										className="button button-main"
										onClick={isLocked ? this.selectDir : this.selectMoveDir}
									>
										{isLocked ? translations["change-directory"] : translations["move-file"]}
									</button>
								</>
							)}
							{/* Reset diary (delete file in selected directory) */}
							<button
								type="button"
								className="button button-main"
								disabled={!fileExists}
								onClick={this.showResetPrompt}
							>
								{translations["reset-diary"]}
							</button>
						</div>
					</fieldset>
					{/* Password (only when unlocked) */
					!isLocked && (
						<fieldset className="fieldset-password">
							<legend>{translations.password}</legend>
							<div className="fieldset-content">
								<input
									type="password"
									value={password1}
									placeholder={translations["new-password"]}
									required
									onChange={this.onChangePassword1}
								/>
								<input
									type="password"
									value={password2}
									placeholder={translations["repeat-new-password"]}
									required
									onChange={this.onChangePassword2}
								/>
								<button
									type="button"
									disabled={!password1 || !password2 || !passwordsMatch}
									onClick={this.updatePassword}
									className="button button-main"
								>
									{translations["change-password"]}
								</button>
							</div>
							<div className="password-update-banner">
								{password1 && password2 && !passwordsMatch && (
									<Banner bannerType="error" message={translations["passwords-no-match"]} />
								)}
							</div>
						</fieldset>
					)}
				</form>
			</OverlayContainer>
		);
	}
}
