import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import TextareaAutosize from 'react-autosize-textarea';

import { toWeekdayDateString, toIndexDate } from '../../../helpers/dateFormat';
import { translations } from '../../../helpers/i18n';

const AUTOSAVE_INTERVAL = 1000;

const propTypes = {
	dateSelected: PropTypes.instanceOf(Date).isRequired,
	entries: PropTypes.objectOf(
		PropTypes.shape({
			dateUpdated: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		})
	).isRequired,
	updateEntry: PropTypes.func.isRequired
};

export default class Editor extends PureComponent {
	static onTitleEnterKey(e) {
		// On typing "enter" in the title textarea, do not insert a newline character and jump to
		// the next form element
		if (e.which === 13) {
			e.preventDefault();
			e.target.nextElementSibling.focus();
		}
	}

	static getDerivedStateFromProps(props, state) {
		const { dateSelected: dateProps, entries } = props;
		const { dateSelected: dateState } = state;
		if (dateProps === dateState) {
			return null;
		}
		const indexDate = toIndexDate(dateProps);
		let text = '';
		let title = '';
		if (entries[indexDate]) {
			({ text, title } = entries[indexDate]);
		}
		return {
			dateSelected: dateProps,
			text,
			title
		};
	}

	constructor(props) {
		super(props);

		const { dateSelected, entries } = props;
		const indexDate = toIndexDate(dateSelected);
		let text = '';
		let title = '';
		if (entries[indexDate]) {
			({ text, title } = entries[indexDate]);
		}
		this.state = {
			dateSelected,
			text,
			title
		};

		// Function bindings
		this.onTextChange = this.onTextChange.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.saveEntry = this.saveEntry.bind(this);
		this.saveEntryDebounced = debounce(this.saveEntry.bind(this), AUTOSAVE_INTERVAL);

		// Save entry before app is closed
		window.addEventListener('unload', () => {
			this.saveEntry();
		});
	}

	onTextChange(e) {
		const text = e.target.value;
		this.setState({
			text
		});
		this.saveEntryDebounced();
	}

	onTitleChange(e) {
		const title = e.target.value;
		this.setState({
			title
		});
		this.saveEntryDebounced();
	}

	saveEntry() {
		const { dateSelected, updateEntry } = this.props;
		const { text, title } = this.state;
		const indexDate = toIndexDate(dateSelected);

		updateEntry(indexDate, title.trim(), text.trim());
	}

	render() {
		const { dateSelected, text, title } = this.state;
		const indexDate = toWeekdayDateString(dateSelected);

		return (
			<form className="editor">
				<p className="text-faded">{indexDate}</p>
				<TextareaAutosize
					className="editor-title"
					value={title}
					onChange={this.onTitleChange}
					onBlur={this.saveEntry}
					onKeyPress={Editor.onTitleEnterKey}
					placeholder={translations['add-a-title']}
				/>
				<TextareaAutosize
					className="editor-text"
					value={text}
					onChange={this.onTextChange}
					onBlur={this.saveEntry}
					placeholder={`${translations['write-something']}…`}
				/>
			</form>
		);
	}
}

Editor.propTypes = propTypes;
