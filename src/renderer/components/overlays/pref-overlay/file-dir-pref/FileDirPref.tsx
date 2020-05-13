import { remote } from "electron";

import logger from "electron-log";
import { is } from "electron-util";
import React, { ReactElement, useState } from "react";

import { FILE_NAME, getDiaryFilePath } from "../../../../files/diary/diaryFile";
import { moveFile } from "../../../../files/fileAccess";
import { saveDirPref } from "../../../../files/preferences/preferences";
import { translations } from "../../../../utils/i18n";
import DiaryResetButtonContainer from "./diary-reset-button/DiaryResetButtonContainer";

export interface StateProps {
	hashedPassword: string;
}

export interface DispatchProps {
	testFileExists: () => void;
}

type Props = StateProps & DispatchProps;

/**
 * Preference fieldset for updating the diary file's directory (when locked) or moving it to another
 * directory (when unlocked)
 */
export default function FileDirPref(props: Props): ReactElement {
	const { hashedPassword, testFileExists } = props;

	const isLocked = hashedPassword === "";

	const [fileDir, setFileDir] = useState(getDiaryFilePath());

	const updateDir = (dir: string): void => {
		saveDirPref(dir);
		setFileDir(getDiaryFilePath());
	};

	const selectMoveDir = async (): Promise<void> => {
		// Show dialog for selecting directory
		const { filePaths } = await remote.dialog.showOpenDialog({
			buttonLabel: translations["move-file"],
			properties: ["openDirectory"],
		});

		if (filePaths && filePaths.length === 1) {
			// Move mini-diary.txt file to selected directory
			const newDir = filePaths[0];
			try {
				moveFile(fileDir, `${newDir}/${FILE_NAME}`);
			} catch (err) {
				logger.error("Error moving diary file: ", err);
				remote.dialog.showErrorBox(
					translations["move-error-title"],
					`${translations["move-error-msg"]}: ${err.message}`,
				);
				return;
			}
			updateDir(newDir);
		}
	};

	const selectDir = async (): Promise<void> => {
		// Show dialog for selecting directory
		const { filePaths } = await remote.dialog.showOpenDialog({
			buttonLabel: translations["select-directory"],
			properties: ["openDirectory"],
		});

		if (filePaths && filePaths.length === 1) {
			// Use mini-diary.txt file from selected directory
			const newDir = filePaths[0];
			updateDir(newDir);
			testFileExists();
		}
	};

	/*
		File directory
		- When locked: Change directory
		- When unlocked: Move diary file and change directory
		Not visible in MAS build due to sandboxing (would not be able to reopen the diary file without
		seeing an open dialog on every app launch)
	*/
	return (
		<fieldset className="fieldset-file-dir">
			<legend>{translations["diary-file"]}</legend>
			<div className="fieldset-content">
				<div className="form-group">
					{!is.macAppStore && (
						<>
							<p className="file-dir">{fileDir}</p>
							<button
								type="button"
								className="button button-main"
								onClick={isLocked ? selectDir : selectMoveDir}
							>
								{isLocked ? translations["change-directory"] : translations["move-file"]}
							</button>
						</>
					)}
					<DiaryResetButtonContainer />
				</div>
			</div>
		</fieldset>
	);
}
