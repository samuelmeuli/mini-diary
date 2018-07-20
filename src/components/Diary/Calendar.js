import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Day from '../../helpers/Day';


const propTypes = {
	date: PropTypes.instanceOf(Day).isRequired,
	entryDates: PropTypes.arrayOf(PropTypes.string).isRequired,
	setDate: PropTypes.func.isRequired
};

export default class Calendar extends Component {
	render() {
		const { date } = this.props;

		return (
			<p>Date: {date.toString()}</p>
		);
	}
}

Calendar.propTypes = propTypes;
