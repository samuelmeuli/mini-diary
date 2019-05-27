import iconPrev from "feather-icons/dist/icons/chevron-left.svg";
import iconNext from "feather-icons/dist/icons/chevron-right.svg";
import moment from "moment";
import React, { FunctionComponent } from "react";
import SimpleSvg from "react-simple-svg";

import { toMonthYear } from "../../../../utils/dateFormat";
import { translations } from "../../../../utils/i18n";

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
				<SimpleSvg src={iconPrev} title={translations["previous-month"]} height={20} width={20} />
			</button>
			<h1 className="month-name">{toMonthYear(month)}</h1>
			<button
				type="button"
				className="button button-invisible"
				disabled={disableNextButton}
				onClick={setMonthSelectedNext}
			>
				<SimpleSvg src={iconNext} title={translations["next-month"]} height={20} width={20} />
			</button>
		</div>
	);
};

export default CalendarNav;
