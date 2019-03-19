import { ContentState, Editor as DraftJsEditor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import debounce from "lodash.debounce";
import React, { PureComponent } from "react";

import { translations } from "../../../utils/i18n";
import { toIndexDate, toLocaleWeekday } from "../../../utils/dateFormat";

const AUTOSAVE_INTERVAL = 1000;

interface Props {
	dateSelected: Date;
	entries: Entries;
	updateEntry: (entryDate: IndexDate, title: string, text: string) => void;
}

interface State {
	dateSelected: Date,
	textEditorState: EditorState,
	titleEditorState: EditorState
}

export default class Editor extends PureComponent<Props, State> {
	saveEntryDebounced: () => void;

	static getDerivedStateFromProps(props: Props, state: State) {
		const { dateSelected: dateProps, entries } = props;
		const { dateSelected: dateState } = state;

		if (dateProps === dateState) {
			return null;
		}
		const entryState = Editor.getStateFromEntry(entries, dateProps);
		return {
			...entryState,
			dateSelected: dateProps,
		};
	}

	static getStateFromEntry(entries: Entries, date: Date) {
		const indexDate = toIndexDate(date);
		const entry = entries[indexDate];
		let text = "";
		let title = "";
		if (entry) {
			({ text, title } = entry);
		}
		return {
			textEditorState: EditorState.createWithContent(ContentState.createFromText(text)),
			titleEditorState: EditorState.createWithContent(ContentState.createFromText(title)),
		};
	}

	constructor(props: Props) {
		super(props);
		const { dateSelected, entries } = props;

		const entryState = Editor.getStateFromEntry(entries, dateSelected);
		this.state = {
			...entryState,
			dateSelected,
		};

		// Function bindings
		this.onTextChange = this.onTextChange.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.saveEntry = this.saveEntry.bind(this);
		this.saveEntryDebounced = debounce(this.saveEntry.bind(this), AUTOSAVE_INTERVAL);

		// Save entry before app is closed
		window.addEventListener("unload", () => {
			this.saveEntry();
		});
	}

	onTextChange(textEditorState: EditorState) {
		this.setState({
			textEditorState,
		});
		this.saveEntryDebounced();
	}

	onTitleChange(titleEditorState: EditorState) {
		this.setState({
			titleEditorState,
		});
		this.saveEntryDebounced();
	}

	saveEntry() {
		const { dateSelected, updateEntry } = this.props;
		const { textEditorState, titleEditorState } = this.state;

		const indexDate = toIndexDate(dateSelected);
		const title = titleEditorState.getCurrentContent().getPlainText();
		const text = textEditorState.getCurrentContent().getPlainText();
		updateEntry(indexDate, title.trim(), text.trim());
	}

	render() {
		const { dateSelected, textEditorState, titleEditorState } = this.state;

		const weekdayDate = toLocaleWeekday(dateSelected);
		return (
			<form className="editor">
				<p className="text-faded">{weekdayDate}</p>
				<div className="editor-title-wrapper">
					<DraftJsEditor
						editorState={titleEditorState}
						onBlur={this.saveEntry}
						onChange={this.onTitleChange}
						placeholder={translations["add-a-title"]}
					/>
				</div>
				<div className="editor-text-wrapper">
					<DraftJsEditor
						editorState={textEditorState}
						onBlur={this.saveEntry}
						onChange={this.onTextChange}
						placeholder={`${translations["write-something"]}…`}
					/>
				</div>
			</form>
		);
	}
}
