import { EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import iconBold from "feather-icons/dist/icons/bold.svg";
import iconItalic from "feather-icons/dist/icons/italic.svg";
import iconUl from "feather-icons/dist/icons/list.svg";
import React, { PureComponent } from "react";
import SimpleSvg from "react-simple-svg";

import iconOl from "../../../assets/icons/ordered-list.svg";
import { translations } from "../../../utils/i18n";

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

	render(): React.ReactNode {
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
				className="editor-buttons-wrapper"
				onMouseDown={e => {
					e.preventDefault(); // Keep focus on editor when a button is clicked
				}}
				role="none"
			>
				<button
					type="button"
					className={`button button-invisible ${isBold ? "button-active" : ""}`}
					onClick={this.onBoldClick}
				>
					<SimpleSvg src={iconBold} height={20} width={20} title={translations.bold} />
				</button>
				<button
					type="button"
					className={`button button-invisible ${isItalic ? "button-active" : ""}`}
					onClick={this.onItalicClick}
				>
					<SimpleSvg src={iconItalic} height={20} width={20} title={translations.italic} />
				</button>
				<button
					type="button"
					className={`button button-invisible ${isUl ? "button-active" : ""}`}
					onClick={this.onUlClick}
				>
					<SimpleSvg src={iconUl} height={20} width={20} title={translations.bullets} />
				</button>
				<button
					type="button"
					className={`button button-invisible ${isOl ? "button-active" : ""}`}
					onClick={this.onOlClick}
				>
					<SimpleSvg src={iconOl} height={20} width={20} title={translations.numbers} />
				</button>
			</div>
		);
	}
}
