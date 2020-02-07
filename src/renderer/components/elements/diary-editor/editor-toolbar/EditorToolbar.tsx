import "draft-js/dist/Draft.css";

import { EditorState, RichUtils } from "draft-js";
import BoldIcon from "feather-icons/dist/icons/bold.svg";
import ItalicIcon from "feather-icons/dist/icons/italic.svg";
import UlIcon from "feather-icons/dist/icons/list.svg";
import React, { PureComponent, ReactNode } from "react";

import OlIcon from "../../../../assets/icons/ordered-list.svg";
import { translations } from "../../../../utils/i18n";
import { iconProps } from "../../../../utils/icons";

const STROKE_WIDTH_DEFAULT = 2;
const STROKE_WIDTH_SELECTED = 3;

export interface CustomProps {
	onTextChange: (textEditorState: EditorState) => void;
	textEditorState: EditorState;
}

type Props = CustomProps;

export default class EditorToolbar extends PureComponent<Props, {}> {
	constructor(props: Props) {
		super(props);

		// Function bindings
		this.onBoldClick = this.onBoldClick.bind(this);
		this.onItalicClick = this.onItalicClick.bind(this);
		this.onOlClick = this.onOlClick.bind(this);
		this.onUlClick = this.onUlClick.bind(this);
	}

	onBoldClick(): void {
		const { onTextChange, textEditorState } = this.props;

		onTextChange(RichUtils.toggleInlineStyle(textEditorState, "BOLD"));
	}

	onItalicClick(): void {
		const { onTextChange, textEditorState } = this.props;

		onTextChange(RichUtils.toggleInlineStyle(textEditorState, "ITALIC"));
	}

	onOlClick(): void {
		const { onTextChange, textEditorState } = this.props;

		onTextChange(RichUtils.toggleBlockType(textEditorState, "ordered-list-item"));
	}

	onUlClick(): void {
		const { onTextChange, textEditorState } = this.props;

		onTextChange(RichUtils.toggleBlockType(textEditorState, "unordered-list-item"));
	}

	render(): ReactNode {
		const { textEditorState } = this.props;

		// Detect active inline/block styles
		const inlineStyle = textEditorState.getCurrentInlineStyle();
		const blockType = RichUtils.getCurrentBlockType(textEditorState);
		const isBold = inlineStyle.has("BOLD");
		const isItalic = inlineStyle.has("ITALIC");
		const isOl = blockType === "ordered-list-item";
		const isUl = blockType === "unordered-list-item";

		return (
			<div
				className="editor-toolbar"
				onMouseDown={(e): void => {
					e.preventDefault(); // Keep focus on editor when a button is clicked
				}}
				role="none"
			>
				<button
					type="button"
					className={`button button-invisible ${isBold ? "button-active" : ""}`}
					onClick={this.onBoldClick}
				>
					<BoldIcon
						{...iconProps}
						strokeWidth={isBold ? STROKE_WIDTH_SELECTED : STROKE_WIDTH_DEFAULT}
						title={translations.bold}
					/>
				</button>
				<button
					type="button"
					className={`button button-invisible ${isItalic ? "button-active" : ""}`}
					onClick={this.onItalicClick}
				>
					<ItalicIcon
						{...iconProps}
						strokeWidth={isItalic ? STROKE_WIDTH_SELECTED : STROKE_WIDTH_DEFAULT}
						title={translations.italic}
					/>
				</button>
				<button
					type="button"
					className={`button button-invisible ${isUl ? "button-active" : ""}`}
					onClick={this.onUlClick}
				>
					<UlIcon
						{...iconProps}
						strokeWidth={isUl ? STROKE_WIDTH_SELECTED : STROKE_WIDTH_DEFAULT}
						title={translations.bullets}
					/>
				</button>
				<button
					type="button"
					className={`button button-invisible ${isOl ? "button-active" : ""}`}
					onClick={this.onOlClick}
				>
					<OlIcon
						{...iconProps}
						strokeWidth={isOl ? STROKE_WIDTH_SELECTED : STROKE_WIDTH_DEFAULT}
						title={translations.list}
					/>
				</button>
			</div>
		);
	}
}
