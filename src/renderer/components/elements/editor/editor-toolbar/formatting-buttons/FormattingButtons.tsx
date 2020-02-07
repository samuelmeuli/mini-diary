import { EditorState, RichUtils } from "draft-js";
import BoldIcon from "feather-icons/dist/icons/bold.svg";
import ItalicIcon from "feather-icons/dist/icons/italic.svg";
import UlIcon from "feather-icons/dist/icons/list.svg";
import React, { ReactElement } from "react";

import OlIcon from "../../../../../assets/icons/ordered-list.svg";
import { translations } from "../../../../../utils/i18n";
import { iconProps } from "../../../../../utils/icons";

const STROKE_WIDTH_DEFAULT = 2;
const STROKE_WIDTH_SELECTED = 3;

export interface CustomProps {
	onTextChange: (textEditorState: EditorState) => void;
	textEditorState: EditorState;
}

type Props = CustomProps;

/**
 * Toolbar buttons for changing the formatting of the diary entry (bold, italic, lists)
 */
export default function FormattingButtons(props: Props): ReactElement {
	const { onTextChange, textEditorState } = props;

	const onBoldClick = (): void => {
		onTextChange(RichUtils.toggleInlineStyle(textEditorState, "BOLD"));
	};

	const onItalicClick = (): void => {
		onTextChange(RichUtils.toggleInlineStyle(textEditorState, "ITALIC"));
	};

	const onOlClick = (): void => {
		onTextChange(RichUtils.toggleBlockType(textEditorState, "ordered-list-item"));
	};

	const onUlClick = (): void => {
		onTextChange(RichUtils.toggleBlockType(textEditorState, "unordered-list-item"));
	};

	// Detect active inline/block styles
	const inlineStyle = textEditorState.getCurrentInlineStyle();
	const blockType = RichUtils.getCurrentBlockType(textEditorState);
	const isBold = inlineStyle.has("BOLD");
	const isItalic = inlineStyle.has("ITALIC");
	const isOl = blockType === "ordered-list-item";
	const isUl = blockType === "unordered-list-item";

	return (
		<div className="formatting-buttons">
			<button
				type="button"
				className={`button button-invisible ${isBold ? "button-active" : ""}`}
				onClick={onBoldClick}
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
				onClick={onItalicClick}
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
				onClick={onUlClick}
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
				onClick={onOlClick}
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
