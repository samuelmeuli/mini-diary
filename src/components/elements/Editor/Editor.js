import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TextareaAutosize from 'react-autosize-textarea';

import { getFilePath } from '../../../helpers/preferences';


const propTypes = {
	dateSelected: PropTypes.instanceOf(Date).isRequired,
	entries: PropTypes.objectOf(PropTypes.shape({
		dateUpdated: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	})).isRequired,
	hashedPassword: PropTypes.string.isRequired,
	updateFile: PropTypes.func.isRequired
};

export default class Editor extends Component {
	static formatDate(date) {
		return moment(date).format('YYYY-MM-DD');
	}

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
		const dateFormatted = Editor.formatDate(dateProps);
		let text = '';
		let title = '';
		if (entries[dateFormatted]) {
			({ text, title } = entries[dateFormatted]);
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
		const dateFormatted = Editor.formatDate(dateSelected);
		let text = '';
		let title = '';
		if (entries[dateFormatted]) {
			({ text, title } = entries[dateFormatted]);
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
	}

	onTextChange(e) {
		const text = e.target.value;
		this.setState({
			text
		});
	}

	onTitleChange(e) {
		const title = e.target.value;
		this.setState({
			title
		});
	}

	saveEntry() {
		const { dateSelected, hashedPassword, updateFile } = this.props;
		const { text, title } = this.state;
		const dateFormatted = Editor.formatDate(dateSelected);
		const filePath = getFilePath();

		updateFile(filePath, hashedPassword, dateFormatted, title, text);
	}

	render() {
		const { dateSelected, text, title } = this.state;
		const dateFormatted = moment(dateSelected).format('dddd, D MMMM YYYY');

		// TODO save input when quitting app
		return (
			<form className="editor">
				<p className="text-faded">{dateFormatted}</p>
				<TextareaAutosize
					className="editor-title"
					value={title}
					onChange={this.onTitleChange}
					onBlur={this.saveEntry}
					onKeyPress={Editor.onTitleEnterKey}
					placeholder="Add a title"
				/>
				<TextareaAutosize
					className="editor-text"
					value={text}
					onChange={this.onTextChange}
					onBlur={this.saveEntry}
					placeholder="Write something..."
				/>
			</form>
		);
	}
}

Editor.propTypes = propTypes;
