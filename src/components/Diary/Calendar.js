import React from 'react';
import PropTypes from 'prop-types';

import Day from '../../helpers/Day';


const propTypes = {
	date: PropTypes.instanceOf(Day).isRequired
};

export default function Calendar(props) {
	const { date } = props;

	return (
		<p>Date: {date.toString()}</p>
	);
}

Calendar.propTypes = propTypes;
