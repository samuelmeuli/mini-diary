import { EditorState } from "draft-js";
import React, { ReactElement } from "react";

import FormattingButtons from "../formatting-buttons/FormattingButtons";
import WordCountWrapper from "../word-count/WordCountWrapper";

export interface CustomProps {
	onTextChange: (textEditorState: EditorState) => void;
	textEditorState: EditorState;
}

type Props = CustomProps;

export default function EditorToolbar(props: Props): ReactElement {
	const { onTextChange, textEditorState } = props;

	return (
		<div
			className="editor-toolbar"
			onMouseDown={(e): void => {
				e.preventDefault(); // Keep focus on editor when a button is clicked
			}}
			role="none"
		>
			<FormattingButtons onTextChange={onTextChange} textEditorState={textEditorState} />
			<WordCountWrapper />
		</div>
	);
}
