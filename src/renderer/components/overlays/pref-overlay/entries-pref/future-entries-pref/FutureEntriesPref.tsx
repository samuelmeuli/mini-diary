import React, { ReactElement } from "react";

import { translations } from "../../../../../utils/i18n";

export interface StateProps {
	allowFutureEntries: boolean;
}

export interface DispatchProps {
	updateFutureEntriesPref: (allowFutureEntries: boolean) => void;
}

type Props = StateProps & DispatchProps;

/**
 * Preference fieldset for allowing or disallowing diary entries in the future
 */
export default function FutureEntriesPref(props: Props): ReactElement {
	const { allowFutureEntries, updateFutureEntriesPref } = props;

	const toggleAllowFutureEntries = (): void => updateFutureEntriesPref(!allowFutureEntries);

	return (
		<label htmlFor="checkbox-future-entries">
			<input
				type="checkbox"
				name="checkbox-future-entries"
				id="checkbox-future-entries"
				checked={allowFutureEntries}
				onChange={toggleAllowFutureEntries}
			/>
			{translations["allow-future-entries"]}
		</label>
	);
}
