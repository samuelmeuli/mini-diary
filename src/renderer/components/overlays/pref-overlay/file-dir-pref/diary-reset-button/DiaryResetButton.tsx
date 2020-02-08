import { remote } from "electron";

import React, { ReactElement } from "react";

import { translations } from "../../../../../utils/i18n";

export interface StateProps {
	fileExists: boolean;
}

export interface DispatchProps {
	resetDiary: () => void;
	testFileExists: () => void;
}

type Props = StateProps & DispatchProps;

/**
 * Preference button for resetting the currently selected diary (i.e. deleting the diary file on
 * disk)
 */
export default function DiaryResetButton(props: Props): ReactElement {
	const { fileExists, resetDiary, testFileExists } = props;

	const showResetPrompt = async (): Promise<void> => {
		// Show warning prompt asking whether user really wants to reset
		const { response: clickIndex } = await remote.dialog.showMessageBox({
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
	};

	return (
		<button
			type="button"
			className="button button-main"
			disabled={!fileExists}
			onClick={showResetPrompt}
		>
			{translations["reset-diary"]}
		</button>
	);
}
