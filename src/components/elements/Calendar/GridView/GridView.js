import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import moment from 'moment';

import GridNav from './GridNav';


const propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	entries: PropTypes.objectOf(PropTypes.shape({
		dateUpdated: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	})).isRequired,
	setDate: PropTypes.func.isRequired
};

export default class GridView extends PureComponent {
	constructor() {
		super();

		// Function bindings
		this.onDateSelection = this.onDateSelection.bind(this);
	}

	componentDidUpdate() {
		const { date } = this.props;
		const newDate = moment(date);
		const today = moment();

		if (newDate.isSame(today, 'day')) {
			this.datePicker.showMonth(today.toDate());
		}
	}

	onDateSelection(date) {
		const { setDate } = this.props;

		if (moment(date).isSameOrBefore(moment(), 'day')) {
			setDate(date);
		}
	}

	render() {
		const { date, entries } = this.props;

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
				modifiers={{ hasEntry }}
				navbarElement={<GridNav date={date} />}
				onDayClick={this.onDateSelection}
				selectedDays={date}
				toMonth={today}
			/>
		);
	}
}

GridView.propTypes = propTypes;
