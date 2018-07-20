import React, { Component } from 'react';

import Diary from './Diary/Diary';
import PasswordPrompt from './PasswordPrompt/PasswordPrompt';

import Day from '../helpers/Day';


export default class App extends Component {
	constructor(props) {
		super(props);

		// TODO FileSaver init

		this.state = {
			date: new Day(1980, 1, 1), // TODO default to today after testing
			entries: {},
			isLocked: true
		};

		// Function bindings
		this.setDate = this.setDate.bind(this);
		this.setEntry = this.setEntry.bind(this);
		this.lock = this.lock.bind(this);
		this.unlock = this.unlock.bind(this);
	}

	setEntry(date, entry) {
		const { entries } = this.state;
		const entriesUpdated = Object.assign({ [date]: entry }, entries);
		this.setState({
			entries: entriesUpdated
		});
		// TODO FileSaver save
	}

	setDate(date) {
		this.setState({
			date
		});
	}

	lock() {
		// Clear diary entries from state and set app to locked
		this.setState({
			entries: {},
			isLocked: true
		});
	}

	unlock(password) {
		// TODO FileSaver decrypt, load JSON
		// Test entry:
		const entries = {
			'1980-01-01': 'Test'
		};
		this.setState({
			entries,
			isLocked: false
		});
	}

	render() {
		const { entries, isLocked, date } = this.state;
		const entryDates = Object.keys(entries);

		if (isLocked === true) {
			return (
				<PasswordPrompt
					unlock={this.unlock}
				/>
			);
		}

		return (
			<div>
				<Diary
					date={date}
					entry={entries[date.toString()]}
					entryDates={entryDates}
					lock={this.lock}
					setDate={this.setDate}
					setEntry={this.setEntry}
				/>
			</div>
		);
	}
}
