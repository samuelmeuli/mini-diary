import React, { ReactElement } from "react";

import { translations } from "../../../utils/i18n";
import OverlayContainer from "../overlay-hoc/OverlayContainer";
import EntriesPref from "./entries-pref/EntriesPref";
import FileDirPrefContainer from "./file-dir-pref/FileDirPrefContainer";
import FirstDayOfWeekPrefContainer from "./first-day-of-week-pref/FirstDayOfWeekPrefContainer";
import PasswordPrefContainer from "./password-pref/PasswordPrefContainer";
import ThemePrefContainer from "./theme-pref/ThemePrefContainer";

export interface StateProps {
	hashedPassword: string;
}

type Props = StateProps;

/**
 * Overlay window for user preferences
 */
export default function PrefOverlay(props: Props): ReactElement {
	const { hashedPassword } = props;

	const isLocked = hashedPassword === "";

	return (
		<OverlayContainer className="pref-overlay">
			<h1>{translations.preferences}</h1>
			<form className="preferences-form">
				<ThemePrefContainer />
				{!isLocked && <FirstDayOfWeekPrefContainer />}
				{!isLocked && <EntriesPref />}
				<FileDirPrefContainer />
				{!isLocked && <PasswordPrefContainer />}
			</form>
		</OverlayContainer>
	);
}
