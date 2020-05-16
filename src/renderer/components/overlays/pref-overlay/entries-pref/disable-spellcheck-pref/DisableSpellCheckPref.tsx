import React, { ReactElement } from "react";

import { translations } from "../../../../../utils/i18n";

export interface StateProps {
	disableSpellCheck: boolean;
}

export interface DispatchProps {
	updateDisableSpellCheckPref: (disableSpellCheck: boolean) => void;
}

type Props = StateProps & DispatchProps;

/**
 * Preference fieldset for enabling or disabling spellcheck
 */
export default function DisableSpellCheckPref(props: Props): ReactElement {
	const { disableSpellCheck, updateDisableSpellCheckPref } = props;

	const toggleDisableSpellCheck = (): void => updateDisableSpellCheckPref(!disableSpellCheck);

	return (
		<label htmlFor="checkbox-disable-spellcheck">
			<input
				type="checkbox"
				name="checkbox-disable-spellcheck"
				id="checkbox-disable-spellcheck"
				checked={disableSpellCheck}
				onChange={toggleDisableSpellCheck}
			/>
			{translations["disable-spellcheck"]}
		</label>
	);
}
