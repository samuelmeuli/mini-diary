import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ContentState, Editor as DraftJsEditor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import debounce from 'lodash.debounce';
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
	static getDerivedStateFromProps(props, state) {
		const { dateSelected: dateProps, entries } = props;
		const { dateSelected: dateState } = state;
		if (dateProps === dateState) {
			return null;
		}
		const entryState = Editor.getStateFromEntry(entries, dateProps);
		return {
			...entryState,
			dateSelected: dateProps
		};
	}

	static getStateFromEntry(entries, date) {
		const indexDate = toIndexDate(date);
		const entry = entries[indexDate];
		let text = '';
		let title = '';
		if (entry) {
			({ text, title } = entry);
		}
		return {
			textEditorState: EditorState.createWithContent(ContentState.createFromText(text)),
			titleEditorState: EditorState.createWithContent(ContentState.createFromText(title))
		};
	}

	constructor(props) {
		super(props);
		const { dateSelected, entries } = props;

		const entryState = Editor.getStateFromEntry(entries, dateSelected);
		this.state = {
			...entryState,
			dateSelected
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

	onTextChange(textEditorState) {
		this.setState({
			textEditorState
		});
		this.saveEntryDebounced();
	}

	onTitleChange(titleEditorState) {
		this.setState({
			titleEditorState
		});
		this.saveEntryDebounced();
	}

	saveEntry() {
		const { dateSelected, updateEntry } = this.props;
		const { textEditorState, titleEditorState } = this.state;

		const title = titleEditorState.getCurrentContent().getPlainText();
		const text = textEditorState.getCurrentContent().getPlainText();
		const indexDate = toIndexDate(dateSelected);
		updateEntry(indexDate, title.trim(), text.trim());
	}

	render() {
		const { dateSelected, textEditorState, titleEditorState } = this.state;
		const indexDate = toWeekdayDateString(dateSelected);

		return (
			<form className="editor">
				<p className="text-faded">{indexDate}</p>
				<div className="editor-title-wrapper">
					<DraftJsEditor
						editorState={titleEditorState}
						onBlur={this.saveEntry}
						onChange={this.onTitleChange}
						placeholder={translations['add-a-title']}
					/>
				</div>
				<div className="editor-text-wrapper">
					<DraftJsEditor
						editorState={textEditorState}
						onBlur={this.saveEntry}
						onChange={this.onTextChange}
						placeholder={`${translations['write-something']}…`}
					/>
				</div>
			</form>
		);
	}
}

Editor.propTypes = propTypes;
