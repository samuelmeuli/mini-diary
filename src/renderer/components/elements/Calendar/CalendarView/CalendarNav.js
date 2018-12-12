/* eslint react/forbid-prop-types: 0 */
/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import iconNext from 'feather-icons/dist/icons/chevron-right.svg';
import iconPrev from 'feather-icons/dist/icons/chevron-left.svg';
import moment from 'moment';
import SimpleSvg from 'react-simple-svg';


const propTypes = {
	monthSelected: PropTypes.instanceOf(Date).isRequired,
	setMonthSelectedNext: PropTypes.func.isRequired,
	setMonthSelectedPrevious: PropTypes.func.isRequired
};

export default function CalendarNav(props) {
	const { monthSelected, setMonthSelectedNext, setMonthSelectedPrevious } = props;

	const month = moment(monthSelected);

	// Disable "next" button if current month is reached
	const today = moment();
	const disableNextButton = month.isSame(today, 'month');

	// Determine name of current month
	const monthStr = month.format('MMMM YYYY');

	return (
		<div className="calendar-nav">
			<button
				type="button"
				className="button button-invisible"
				onClick={setMonthSelectedPrevious}
			>
				<SimpleSvg src={iconPrev} title="Prev. month" height={20} width={20} />
			</button>
			<h1 className="month-name">{monthStr}</h1>
			<button
				type="button"
				className="button button-invisible"
				disabled={disableNextButton}
				onClick={setMonthSelectedNext}
			>
				<SimpleSvg src={iconNext} title="Next month" height={20} width={20} />
			</button>
		</div>
	);
}

CalendarNav.propTypes = propTypes;
