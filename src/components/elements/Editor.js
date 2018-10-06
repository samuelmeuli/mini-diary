import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
	date: PropTypes.instanceOf(Date).isRequired
};

export default function Editor(props) {
	const { date } = props;

	return (
		<p>Diary entry for {date.toString()}</p>
	);
}

Editor.propTypes = propTypes;
