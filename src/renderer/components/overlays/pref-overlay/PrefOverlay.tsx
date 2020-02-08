import React, { ReactElement } from "react";

import { translations } from "../../../utils/i18n";
import OverlayContainer from "../overlay-hoc/OverlayContainer";
import FileDirPrefContainer from "./file-dir-pref/FileDirPrefContainer";
import FutureEntriesPrefContainer from "./future-entries-pref/FutureEntriesPrefContainer";
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
				{// Future diary entries (only when unlocked)
				!isLocked && <FutureEntriesPrefContainer />}
				<FileDirPrefContainer />
				{// Password (only when unlocked)
				!isLocked && <PasswordPrefContainer />}
			</form>
		</OverlayContainer>
	);
}
