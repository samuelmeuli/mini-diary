import PrevIcon from "feather-icons/dist/icons/chevron-left.svg";
import NextIcon from "feather-icons/dist/icons/chevron-right.svg";
import moment from "moment";
import React, { ReactElement } from "react";

import { MAX_DATE, MIN_DATE } from "../../../../constants";
import { toMonthYear } from "../../../../utils/dateFormat";
import { translations } from "../../../../utils/i18n";
import { iconProps } from "../../../../utils/icons";

export interface StateProps {
	allowFutureEntries: boolean;
	monthSelected: Date;
}

export interface DispatchProps {
	setMonthSelectedNext: () => void;
	setMonthSelectedPrevious: () => void;
}

type Props = StateProps & DispatchProps;

export default function CalendarNav(props: Props): ReactElement {
	const {
		allowFutureEntries,
		monthSelected,
		setMonthSelectedNext,
		setMonthSelectedPrevious,
	} = props;

	const today = moment();

	// Check if buttons for switching to previous/next month should be enabled. Determined based on
	// the min/max dates and whether future diary entries are allowed
	const month = moment(monthSelected);
	const canClickPrev = month.isAfter(MIN_DATE, "month");
	const canClickNext =
		month.isBefore(MAX_DATE, "month") && (allowFutureEntries || month.isBefore(today, "month"));

	return (
		<div className="calendar-nav">
			<button
				type="button"
				className="button button-invisible"
				disabled={!canClickPrev}
				onClick={setMonthSelectedPrevious}
			>
				<PrevIcon {...iconProps} title={translations["previous-month"]} />
			</button>
			<h1 className="month-name">{toMonthYear(month)}</h1>
			<button
				type="button"
				className="button button-invisible"
				disabled={!canClickNext}
				onClick={setMonthSelectedNext}
			>
				<NextIcon {...iconProps} title={translations["next-month"]} />
			</button>
		</div>
	);
}
