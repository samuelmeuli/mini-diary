import PrevIcon from "feather-icons/dist/icons/chevron-left.svg";
import NextIcon from "feather-icons/dist/icons/chevron-right.svg";
import moment from "moment";
import React, { FunctionComponent } from "react";

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

const CalendarNav: FunctionComponent<Props> = (props: Props): JSX.Element => {
	const {
		allowFutureEntries,
		monthSelected,
		setMonthSelectedNext,
		setMonthSelectedPrevious,
	} = props;

	const month = moment(monthSelected);

	// If future entries are disallowed: Disable "next" button if current month is reached
	const today = moment();
	const disableNextButton = !allowFutureEntries && month.isSame(today, "month");

	return (
		<div className="calendar-nav">
			<button type="button" className="button button-invisible" onClick={setMonthSelectedPrevious}>
				<PrevIcon {...iconProps} title={translations["previous-month"]} />
			</button>
			<h1 className="month-name">{toMonthYear(month)}</h1>
			<button
				type="button"
				className="button button-invisible"
				disabled={disableNextButton}
				onClick={setMonthSelectedNext}
			>
				<NextIcon {...iconProps} title={translations["next-month"]} />
			</button>
		</div>
	);
};

export default CalendarNav;
