import React, { ReactElement } from "react";

import { translations } from "../../../../utils/i18n";

export interface StateProps {
	disableTitles: boolean;
}

export interface DispatchProps {
	updateDisableTitlesPref: (disableTitles: boolean) => void;
}

type Props = StateProps & DispatchProps;

/**
 * Preference fieldset for enabling or disabling titles for diary entries
 */
export default function DisableTitlesPref(props: Props): ReactElement {
	const { disableTitles, updateDisableTitlesPref } = props;

	const toggleDisableTitles = (): void => updateDisableTitlesPref(!disableTitles);

	return (
		<fieldset className="fieldset-disable-titles">
			<legend>{translations["diary-entry-titles"]}</legend>
			<div className="fieldset-content">
				<label htmlFor="checkbox-disable-titles">
					<input
						type="checkbox"
						name="checkbox-disable-titles"
						id="checkbox-disable-titles"
						checked={disableTitles}
						onChange={toggleDisableTitles}
					/>
					{translations["disable-titles"]}
				</label>
			</div>
		</fieldset>
	);
}
