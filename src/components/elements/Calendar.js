import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPicker from 'react-day-picker';

import CalendarNav from './CalendarNav';


const propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	entries: PropTypes.objectOf(PropTypes.shape({
		dateUpdated: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	})).isRequired,
	setDate: PropTypes.func.isRequired
};

export default class Calendar extends Component {
	constructor() {
		super();

		// Function bindings
		this.onDateSelection = this.onDateSelection.bind(this);
		this.onTodaySelection = this.onTodaySelection.bind(this);
	}

	onDateSelection(date) {
		const { setDate } = this.props;
		if (moment(date).isSameOrBefore(moment(), 'day')) {
			setDate(date);
		}
	}

	onTodaySelection() {
		const { setDate } = this.props;
		const today = new Date();
		setDate(today);
		this.datePicker.showMonth(today);
	}

	render() {
		const { date, entries } = this.props;
		const today = new Date();

		const daysWithEntries = Object.keys(entries).map(entry => moment(entry).format('YYYY-MM-DD'));
		const hasEntry = day => daysWithEntries.includes(moment(day).format('YYYY-MM-DD'));

		return (
			<div className="calendar">
				<DayPicker
					ref={(dp) => {
						this.datePicker = dp;
					}}
					captionElement={() => null}
					disabledDays={{ after: today }}
					modifiers={{ hasEntry }}
					navbarElement={(
						<CalendarNav
							date={date}
							onTodaySelection={this.onTodaySelection}
						/>
					)}
					onDayClick={this.onDateSelection}
					selectedDays={date}
					toMonth={today}
				/>
			</div>
		);
	}
}

Calendar.propTypes = propTypes;
