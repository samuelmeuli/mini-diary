import React, { ReactElement } from "react";

import { translations } from "../../../../../utils/i18n";

export interface StateProps {
	enableSpellcheck: boolean;
}

export interface DispatchProps {
	updateSpellcheckPref: (enableSpellcheck: boolean) => void;
}

type Props = StateProps & DispatchProps;

/**
 * Preference fieldset for enabling or disabling spellcheck
 */
export default function SpellcheckPref(props: Props): ReactElement {
	const { enableSpellcheck, updateSpellcheckPref } = props;

	const toggleEnableSpellcheck = (): void => updateSpellcheckPref(!enableSpellcheck);

	return (
		<label htmlFor="checkbox-spellcheck">
			<input
				type="checkbox"
				name="checkbox-spellcheck"
				id="checkbox-spellcheck"
				checked={enableSpellcheck}
				onChange={toggleEnableSpellcheck}
			/>
			{translations["enable-spellcheck"]}
		</label>
	);
}
