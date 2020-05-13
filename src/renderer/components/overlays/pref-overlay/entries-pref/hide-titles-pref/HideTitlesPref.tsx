import React, { ReactElement } from "react";

import { translations } from "../../../../../utils/i18n";

export interface StateProps {
	hideTitles: boolean;
}

export interface DispatchProps {
	updateHideTitlesPref: (hideTitles: boolean) => void;
}

type Props = StateProps & DispatchProps;

/**
 * Preference fieldset for hiding or showing titles for diary entries
 */
export default function HideTitlesPref(props: Props): ReactElement {
	const { hideTitles, updateHideTitlesPref } = props;

	const toggleHideTitles = (): void => updateHideTitlesPref(!hideTitles);

	return (
		<label htmlFor="checkbox-hide-titles">
			<input
				type="checkbox"
				name="checkbox-hide-titles"
				id="checkbox-hide-titles"
				checked={hideTitles}
				onChange={toggleHideTitles}
			/>
			{translations["hide-titles"]}
		</label>
	);
}
