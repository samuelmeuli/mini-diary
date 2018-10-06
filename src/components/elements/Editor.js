import React from 'react';
import PropTypes from 'prop-types';
import Day from '../../helpers/Day';


const propTypes = {
	date: PropTypes.instanceOf(Day).isRequired
};

export default function Editor(props) {
	const { date } = props;

	return (
		<p>Diary entry for {date.toString()}</p>
	);
}

Editor.propTypes = propTypes;
