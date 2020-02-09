import moment from "moment";
import React, { PureComponent, ReactNode } from "react";
import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";

import { toIndexDate } from "../../../../utils/dateFormat";
import { lang } from "../../../../utils/i18n";
import CalendarNavContainer from "../calendar-nav/CalendarNavContainer";

export interface StateProps {
	allowFutureEntries: boolean;
	dateSelected: Date;
	entries: Entries;
	firstDayOfWeek: Weekday | null;
	monthSelected: Date;
}

export interface DispatchProps {
	setDateSelected: (date: Date) => void;
}

type Props = StateProps & DispatchProps;

export default class Calendar extends PureComponent<Props, {}> {
	constructor(props: Props) {
		super(props);

		// Function bindings
		this.onDateSelection = this.onDateSelection.bind(this);
	}

	onDateSelection(date: Date): void {
		const { allowFutureEntries, setDateSelected } = this.props;

		if (allowFutureEntries || moment(date).isSameOrBefore(moment(), "day")) {
			setDateSelected(date);
		}
	}

	render(): ReactNode {
		const { allowFutureEntries, dateSelected, entries, firstDayOfWeek, monthSelected } = this.props;

		const today = new Date();
		const daysWithEntries = Object.keys(entries);
		const hasEntry = (day: Date): boolean => {
			const indexDate = toIndexDate(day);
			return daysWithEntries.includes(indexDate);
		};

		return (
			<DayPicker
				selectedDays={dateSelected}
				disabledDays={allowFutureEntries ? null : { after: today }}
				month={monthSelected}
				toMonth={today}
				captionElement={(): null => null}
				modifiers={{ hasEntry }}
				firstDayOfWeek={firstDayOfWeek ?? undefined}
				locale={lang}
				localeUtils={MomentLocaleUtils}
				navbarElement={<CalendarNavContainer />}
				onDayClick={this.onDateSelection}
			/>
		);
	}
}
