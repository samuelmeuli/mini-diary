import "draft-js/dist/Draft.css";

import {
	ContentState,
	convertFromRaw,
	convertToRaw,
	DraftEditorCommand,
	DraftHandleValue,
	EditorState,
	getDefaultKeyBinding,
	RichUtils,
} from "draft-js";
import createListPlugin from "draft-js-list-plugin";
import PluginEditor from "draft-js-plugins-editor";
import debounce from "lodash.debounce";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { Moment } from "moment-timezone";
import React, { KeyboardEvent, PureComponent, ReactNode } from "react";

import { Entries, IndexDate } from "../../../../types";
import { toIndexDate, toLocaleWeekday } from "../../../../utils/dateFormat";
import { translations } from "../../../../utils/i18n";
import EditorToolbar from "../editor-toolbar/editor-toolbar/EditorToolbar";

type DraftEditorCommandExtended = DraftEditorCommand | "enter";

const AUTOSAVE_INTERVAL = 500;

// Draft.js plugins
const listPlugin = createListPlugin();
const plugins = [listPlugin];

export interface StateProps {
	enableSpellcheck: boolean;
	hideTitles: boolean;
	dateSelected: Moment;
	entries: Entries;
}

export interface DispatchProps {
	updateEntry: (entryDate: IndexDate, title: string, text: string) => void;
}

type Props = StateProps & DispatchProps;

interface State {
	dateSelected: Moment;
	textEditorState: EditorState;
	titleEditorState: EditorState;
}

export default class Editor extends PureComponent<Props, State> {
	static getDerivedStateFromProps(props: Props, state: State): State | null {
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

	static getStateFromEntry(
		entries: Entries,
		date: Moment,
	): { textEditorState: EditorState; titleEditorState: EditorState } {
		const indexDate = toIndexDate(date);
		const entry = entries[indexDate];
		let text = "";
		let title = "";
		if (entry) {
			({ text, title } = entry);
		}

		return {
			textEditorState: EditorState.createWithContent(convertFromRaw(markdownToDraft(text))),
			titleEditorState: EditorState.createWithContent(ContentState.createFromText(title)),
		};
	}

	static titleKeyBindingFn(e: KeyboardEvent): DraftEditorCommandExtended | null {
		if (e.key === "Enter") {
			return "enter";
		}
		return getDefaultKeyBinding(e);
	}

	textEditor: PluginEditor;

	constructor(props: Props) {
		super(props);
		const { dateSelected, entries } = props;

		const entryState = Editor.getStateFromEntry(entries, dateSelected);
		this.state = {
			...entryState,
			dateSelected,
		};
	}

	componentDidMount = (): void => {
		// Save entry before app is closed
		window.addEventListener("unload", this.saveEntry);
	};

	componentWillUnmount = (): void => {
		window.removeEventListener("unload", this.saveEntry);
	};

	onTextChange = (textEditorState: EditorState): void => {
		this.setState({
			textEditorState,
		});
		this.saveEntryDebounced();
	};

	onTitleChange = (titleEditorState: EditorState): void => {
		this.setState({
			titleEditorState,
		});
		this.saveEntryDebounced();
	};

	handleTextKeyCommand = (
		command: DraftEditorCommand,
		editorState: EditorState,
	): DraftHandleValue => {
		let newState: EditorState;
		if (command === "bold") {
			newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
		} else if (command === "italic") {
			newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
		} else {
			return "not-handled";
		}
		this.onTextChange(newState);
		return "handled";
	};

	handleTitleKeyCommand = (command: DraftEditorCommandExtended): DraftHandleValue => {
		// Move focus to text editor when enter key is pressed in title editor
		if (command === "enter") {
			this.textEditor.focus();
			return "handled";
		}
		return "not-handled";
	};

	saveEntry = (): void => {
		const { dateSelected, updateEntry } = this.props;
		const { textEditorState, titleEditorState } = this.state;

		const indexDate = toIndexDate(dateSelected);
		const title = titleEditorState.getCurrentContent().getPlainText();
		const text = draftToMarkdown(convertToRaw(textEditorState.getCurrentContent()));
		updateEntry(indexDate, title.trim(), text.trim());
	};

	// eslint-disable-next-line react/sort-comp
	saveEntryDebounced = debounce(this.saveEntry.bind(this), AUTOSAVE_INTERVAL);

	render = (): ReactNode => {
		const { dateSelected, textEditorState, titleEditorState } = this.state;
		const { enableSpellcheck, hideTitles } = this.props;

		// Detect active inline/block styles
		const blockType = RichUtils.getCurrentBlockType(textEditorState);
		const isOl = blockType === "ordered-list-item";
		const isUl = blockType === "unordered-list-item";

		const weekdayDate = toLocaleWeekday(dateSelected);
		return (
			<form className="editor">
				<div className="editor-scrollable">
					<p className="text-faded">{weekdayDate}</p>
					{!hideTitles && (
						<div className="editor-title-wrapper">
							<PluginEditor
								editorState={titleEditorState}
								handleKeyCommand={this.handleTitleKeyCommand}
								keyBindingFn={Editor.titleKeyBindingFn}
								onBlur={this.saveEntry}
								onChange={this.onTitleChange}
								placeholder={translations["add-a-title"]}
								spellCheck={enableSpellcheck}
							/>
						</div>
					)}
					<div className="editor-text-wrapper">
						<PluginEditor
							editorState={textEditorState}
							handleKeyCommand={this.handleTextKeyCommand}
							onBlur={this.saveEntry}
							onChange={this.onTextChange}
							ref={(textEditor: PluginEditor): void => {
								this.textEditor = textEditor;
							}}
							placeholder={isOl || isUl ? "" : `${translations["write-something"]}…`}
							plugins={plugins}
							spellCheck={enableSpellcheck}
						/>
					</div>
				</div>
				<EditorToolbar onTextChange={this.onTextChange} textEditorState={textEditorState} />
			</form>
		);
	};
}
