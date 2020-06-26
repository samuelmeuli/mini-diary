import { Moment } from "moment-timezone";
import React, { PureComponent, ReactNode } from "react";
import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import LinesEllipsis from "react-lines-ellipsis";

import { Entries, Weekday } from "../../../../types";
import { createDate, parseDate, toIndexDate } from "../../../../utils/dateFormat";
import { translations, lang } from "../../../../utils/i18n";
import CalendarNavContainer from "../calendar-nav/CalendarNavContainer";

export interface StateProps {
	allowFutureEntries: boolean;
	dateSelected: Moment;
	entries: Entries;
	firstDayOfWeek: Weekday | null;
	entryIdSelected: string | null;
}

export interface DispatchProps {
	setDateSelected: (date: Moment) => void;
	selectEntry: (id: string) => void;
}

type Props = StateProps & DispatchProps;

export default class Calendar extends PureComponent<Props, {}> {
	constructor(props: Props) {
		super(props);

		// Function bindings
		this.onDateSelection = this.onDateSelection.bind(this);
		this.onEntrySelection = this.onEntrySelection.bind(this);
	}

	onDateSelection(date: Date): void {
		const { allowFutureEntries, setDateSelected } = this.props;
		const parsedDate = parseDate(date);
		const today = createDate();

		if (allowFutureEntries || parseDate(date).isSameOrBefore(today, "day")) {
			setDateSelected(parsedDate);
		}
	}

	onEntrySelection(id: string): void {
		const { selectEntry } = this.props;
		selectEntry(id);
	}

	truncate = (title: string, maxLength = 23): string =>
		title.length > maxLength ? `${title.substring(0, maxLength).trim()} ...` : title;

	render(): ReactNode {
		const {
			allowFutureEntries,
			dateSelected,
			entries,
			firstDayOfWeek,
			entryIdSelected,
		} = this.props;

		const today = createDate();
		const daysWithEntries = Object.keys(entries);

		const hasEntry = (date: Date): boolean => {
			const indexDate = toIndexDate(parseDate(date));
			return daysWithEntries.includes(indexDate);
		};

		const dateSelectedObj = dateSelected.toDate();
		const indexDate = toIndexDate(dateSelected);
		const todayObj = today.toDate();

		return (
			<div className="sidebar">
				<DayPicker
					month={dateSelectedObj}
					selectedDays={dateSelectedObj}
					disabledDays={allowFutureEntries ? null : { after: todayObj }}
					captionElement={(): null => null}
					modifiers={{ hasEntry }}
					firstDayOfWeek={firstDayOfWeek ?? undefined}
					locale={lang}
					localeUtils={MomentLocaleUtils}
					navbarElement={<CalendarNavContainer />}
					onDayClick={this.onDateSelection}
				/>
				<ul className="day-entries">
					{entries[indexDate] &&
						entries[indexDate].map(e => (
							<li key={e.id} className="entry">
								<button
									type="button"
									className={`button ${e.id === entryIdSelected ? "button-main" : ""}`}
									onClick={(): void => this.onEntrySelection(e.id)}
								>
									<p className={`entry-title ${!e.title ? "text-faded" : ""}`}>
										<LinesEllipsis
											text={e.title || translations["no-title"]}
											ellipsis="..."
											trimRight
											basedOn="words"
										/>
									</p>
								</button>
							</li>
						))}
				</ul>
			</div>
		);
	}
}
