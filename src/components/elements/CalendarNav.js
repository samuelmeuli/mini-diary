/* eslint react/forbid-prop-types: 0 */
/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import SimpleSvg from 'react-simple-svg';
import moment from 'moment';

import iconNext from '../../assets/icons/chevron-right.svg';
import iconPrev from '../../assets/icons/chevron-left.svg';
import iconToday from '../../assets/icons/calendar.svg';


const propTypes = {
	localeUtils: PropTypes.object,
	month: PropTypes.instanceOf(Date),
	onPreviousClick: PropTypes.func,
	onNextClick: PropTypes.func,
	onTodaySelection: PropTypes.func.isRequired,
	previousMonth: PropTypes.instanceOf(Date)
};

export default function CalendarNav(props) {
	const {
		localeUtils,
		month,
		onPreviousClick,
		onNextClick,
		onTodaySelection,
		previousMonth
	} = props;

	// Determine name of current month
	const months = localeUtils.getMonths();
	const monthStr = months[previousMonth.getMonth() + 1];

	// Disable "next" button if current month is reached
	const firstDayOfCurrentMonth = moment().startOf('month');
	const disableNextButton = moment(month).isSameOrAfter(firstDayOfCurrentMonth);

	return (
		<div className="calendar-nav">
			<h1 className="month-name">{monthStr}</h1>
			<button
				type="button"
				className="button-invisible"
				style={{ float: 'left' }}
				onClick={() => onPreviousClick()}
			>
				<SimpleSvg
					src={iconPrev}
					title="Prev. month"
					height={20}
					width={20}
				/>
			</button>
			<button
				type="button"
				className="button-invisible"
				onClick={() => onTodaySelection()}
			>
				<SimpleSvg
					src={iconToday}
					title="Today"
					height={20}
					width={20}
				/>
			</button>
			<button
				type="button"
				className="button-invisible"
				disabled={disableNextButton}
				style={{ float: 'right' }}
				onClick={() => onNextClick()}
			>
				<SimpleSvg
					src={iconNext}
					title="Next month"
					height={20}
					width={20}
				/>
			</button>
		</div>
	);
}

CalendarNav.propTypes = propTypes;
