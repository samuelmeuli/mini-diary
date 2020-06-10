import React, { ReactElement } from "react";

import { translations } from "../../../../../utils/i18n";

export interface StateProps {
	readOnly: boolean;
}

export interface DispatchProps {
	updateReadOnlyPref: (readOnly: boolean) => void;
}

type Props = StateProps & DispatchProps;

/**
 * Preference fieldset for setting the editor state
 */
export default function ReadOnlyPref(props: Props): ReactElement {
	const { readOnly, updateReadOnlyPref } = props;

	const toggleReadOnly = (): void => updateReadOnlyPref(!readOnly);

	return (
		<label htmlFor="checkbox-read-only">
			<input
				type="checkbox"
				name="checkbox-read-only"
				id="checkbox-read-only"
				checked={readOnly}
				onChange={toggleReadOnly}
			/>
			{translations["read-only"]}
		</label>
	);
}
