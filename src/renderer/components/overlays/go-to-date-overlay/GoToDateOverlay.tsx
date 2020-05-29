import logger from "electron-log";
import { Moment } from "moment-timezone";
import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";

import { createDate, fromIndexDate, toIndexDate } from "../../../utils/dateFormat";
import { translations } from "../../../utils/i18n";
import OverlayContainer from "../overlay-hoc/OverlayContainer";

export interface StateProps {
	allowFutureEntries: boolean;
	dateSelected: Moment;
}

export interface DispatchProps {
	closeOverlay: () => void;
	setDateSelected: (date: Moment) => void;
}

type Props = StateProps & DispatchProps;

/**
 * Dialog for quickly jumping to a certain date.
 */
export default function GoToDateOverlay(props: Props): ReactElement {
	const { allowFutureEntries, closeOverlay, dateSelected, setDateSelected } = props;

	const todayFormatted = toIndexDate(createDate());
	const dateSelectedFormatted = toIndexDate(dateSelected);

	// `date` can become `undefined` when the user's date input is incomplete (e.g. year not filled in
	// yet
	const [date, setDate] = useState<string | undefined>(dateSelectedFormatted);

	const onChange = (event: ChangeEvent<HTMLInputElement>): void => setDate(event.target.value);

	const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		if (!date) {
			logger.error("Cannot go to date: Date is not defined");
		} else {
			setDateSelected(fromIndexDate(date));
			closeOverlay();
		}
	};

	const canSubmit =
		date && // `date` must be defined (i.e. user must have provided a valid date input)
		date !== dateSelectedFormatted && // Selected date cannot be the currently selected one
		(allowFutureEntries || date <= todayFormatted); // Disallow future dates if option is set

	return (
		<OverlayContainer className="go-to-date-overlay">
			<form onSubmit={onSubmit}>
				<h1>{translations["go-to-date"]}</h1>
				<label htmlFor="input-go-to-date">
					Date:
					<input
						type="date"
						id="input-go-to-date"
						defaultValue={dateSelectedFormatted}
						onChange={onChange}
					/>
				</label>
				<button type="submit" className="button button-main" disabled={!canSubmit}>
					{translations.ok}
				</button>
			</form>
		</OverlayContainer>
	);
}
