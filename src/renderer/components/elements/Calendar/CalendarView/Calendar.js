import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import moment from 'moment';

import CalendarNav from './CalendarNav';
import { getFirstDayOfWeek } from '../../../../helpers/dateUtils';


const propTypes = {
	dateSelected: PropTypes.instanceOf(Date).isRequired,
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

	componentDidUpdate() {
		const { dateSelected } = this.props;
		const newDate = moment(dateSelected);
		const today = moment();

		if (newDate.isSame(today, 'day')) {
			this.datePicker.showMonth(today.toDate());
		}
	}

	onDateSelection(date) {
		const { setDateSelected } = this.props;

		if (moment(date).isSameOrBefore(moment(), 'day')) {
			setDateSelected(date);
		}
	}

	render() {
		const { dateSelected, entries } = this.props;

		const today = new Date();
		const daysWithEntries = Object.keys(entries).map(entry => moment(entry).format('YYYY-MM-DD'));
		const hasEntry = day => daysWithEntries.includes(moment(day).format('YYYY-MM-DD'));

		return (
			<DayPicker
				ref={(dp) => {
					this.datePicker = dp;
				}}
				captionElement={() => null}
				disabledDays={{ after: today }}
				firstDayOfWeek={this.firstDayOfWeek}
				modifiers={{ hasEntry }}
				navbarElement={<CalendarNav date={dateSelected} />}
				onDayClick={this.onDateSelection}
				selectedDays={dateSelected}
				toMonth={today}
			/>
		);
	}
}

Calendar.propTypes = propTypes;
