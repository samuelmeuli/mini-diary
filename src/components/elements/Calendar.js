import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPicker from 'react-day-picker';

import CalendarNav from './CalendarNav';


const propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
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
		const { date } = this.props;
		const today = new Date();

		return (
			<div className="calendar">
				<DayPicker
					ref={(dp) => {
						this.datePicker = dp;
					}}
					captionElement={() => null}
					disabledDays={{ after: today }}
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
