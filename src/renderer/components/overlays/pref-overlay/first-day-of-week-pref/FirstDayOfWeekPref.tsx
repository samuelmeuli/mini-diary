import React, { ChangeEvent, ReactElement } from "react";

import { Weekday } from "../../../../types";
import { translations } from "../../../../utils/i18n";

const WEEKDAY_IDS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export interface StateProps {
	firstDayOfWeek: Weekday | null;
}

export interface DispatchProps {
	updateFirstDayOfWeekPref: (firstDayOfWeek: Weekday | null) => void;
}

type Props = StateProps & DispatchProps;

/**
 * Preference fieldset for defining what the user considers the first day of the week. This setting
 * affects the arrangement of days in the Calendar component. If the option is set to "auto" (value
 * `null`), the first day of the week will be determined by the system locale
 */
export default function FirstDayOfWeekPref(props: Props): ReactElement {
	const { firstDayOfWeek, updateFirstDayOfWeekPref } = props;

	const onChange = (event: ChangeEvent<HTMLSelectElement>): void =>
		updateFirstDayOfWeekPref(
			event.target.value === "auto" ? null : (parseInt(event.target.value, 10) as Weekday),
		);

	const weekdayOptions = WEEKDAY_IDS.map((weekdayId, weekdayIndex) => (
		<option key={weekdayId} value={weekdayIndex}>
			{translations[weekdayId]}
		</option>
	));

	return (
		<fieldset className="fieldset-first-day-of-week">
			<legend>{translations["first-day-of-week"]}</legend>
			<div className="fieldset-content">
				<select
					id="weekday-select"
					className="button button-main"
					value={firstDayOfWeek ?? "auto"}
					onChange={onChange}
				>
					<option value="auto">{translations.auto}</option>
					{weekdayOptions}
				</select>
			</div>
		</fieldset>
	);
}
