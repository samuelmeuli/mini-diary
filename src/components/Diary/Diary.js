import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Calendar from './Calendar';
import Editor from './Editor';

import Day from '../../helpers/Day';


const propTypes = {
	date: PropTypes.instanceOf(Day).isRequired,
	entryDates: PropTypes.arrayOf(PropTypes.string).isRequired,
	entry: PropTypes.string.isRequired,
	lock: PropTypes.func.isRequired,
	setDate: PropTypes.func.isRequired,
	setEntry: PropTypes.func.isRequired
};

export default class Diary extends Component {
	render() {
		const {
			entryDates,
			date,
			entry,
			lock,
			setDate,
			setEntry
		} = this.props;

		return (
			<div>
				<button type="submit" onClick={lock}>
					Lock
				</button>
				<Calendar
					date={date}
					entryDates={entryDates}
					setDate={setDate}
				/>
				<Editor
					entry={entry}
					setEntry={setEntry}
				/>
			</div>
		);
	}
}

Diary.propTypes = propTypes;
