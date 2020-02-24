import { Entries, MiniDiaryJson } from "../../types";
import { getMetadata } from "../diary/diaryFile";
import sortEntries from "./sortEntries";

/**
 * Convert entries to a Mini Diary JSON string
 */
export function convertToMiniDiaryJson(entries: Entries): Promise<string> {
	return new Promise(resolve => {
		const entriesSorted = sortEntries(entries);
		const entriesJson: Entries = {};

		// Convert sorted array back to object
		entriesSorted.forEach(([indexDate, entry]) => {
			entriesJson[indexDate] = entry;
		});

		// Add metadata
		const content: MiniDiaryJson = {
			metadata: getMetadata(),
			entries: entriesJson,
		};
		resolve(`${JSON.stringify(content, null, "\t")}\n`);
	});
}
