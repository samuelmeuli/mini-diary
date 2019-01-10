import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import moment from 'moment';

import CalendarNavContainer from './CalendarNavContainer';
import { toIndexDate, getFirstDayOfWeek } from '../../../../helpers/dateUtils';


const propTypes = {
	dateSelected: PropTypes.instanceOf(Date).isRequired,
	monthSelected: PropTypes.instanceOf(Date).isRequired,
	entries: PropTypes.objectOf(PropTypes.shape({
		dateUpdated: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	})).isRequired,
	setDateSelected: PropTypes.func.isRequired
};

export default class Calendar extends PureComponent {
	constructor() {
		super();

		// Determine first day of the week for calendar view
		this.firstDayOfWeek = getFirstDayOfWeek();

		// Function bindings
		this.onDateSelection = this.onDateSelection.bind(this);
	}

	onDateSelection(date) {
		const { setDateSelected } = this.props;

		if (moment(date).isSameOrBefore(moment(), 'day')) {
			setDateSelected(date);
		}
	}

	render() {
		const { dateSelected, entries, monthSelected } = this.props;

		const today = new Date();
		const daysWithEntries = Object.keys(entries).map(entry => toIndexDate(entry));
		const hasEntry = day => daysWithEntries.includes(toIndexDate(day));

		return (
			<DayPicker
				selectedDays={dateSelected}
				disabledDays={{ after: today }}
				month={monthSelected}
				toMonth={today}
				captionElement={() => null}
				firstDayOfWeek={this.firstDayOfWeek}
				modifiers={{ hasEntry }}
				navbarElement={<CalendarNavContainer />}
				onDayClick={this.onDateSelection}
			/>
		);
	}
}

Calendar.propTypes = propTypes;
