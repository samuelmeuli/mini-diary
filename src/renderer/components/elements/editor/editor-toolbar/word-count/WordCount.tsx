import React, { ReactElement } from "react";
import countWords from "word-count";

import { toIndexDate } from "../../../../../utils/dateFormat";

export interface StateProps {
	dateSelected: Date;
	entries: Entries;
}

type Props = StateProps;

/**
 * Text component which indicates the number of words/characters (varies per language) for the
 * currently selected diary entry
 */
export default function WordCount(props: Props): ReactElement {
	const { dateSelected, entries } = props;

	let wordCount = 0;

	const indexDate = toIndexDate(dateSelected);

	if (indexDate in entries) {
		const entry = entries[indexDate];
		wordCount = countWords(`${entry.title ?? ""}\n${entry.text ?? ""}`);
	}

	return <p className="word-count">{wordCount}</p>;
}
