import React, { Component } from 'react';
import PropTypes from 'prop-types';


const propTypes = {
	date: PropTypes.string.isRequired,
	entryDates: PropTypes.arrayOf(PropTypes.string).isRequired,
	setDate: PropTypes.func.isRequired
};

export default class Calendar extends Component {
	render() {
		const { date } = this.props;

		return (
			<p>Date: {date}</p>
		);
	}
}

Calendar.propTypes = propTypes;
