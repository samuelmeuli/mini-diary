import { DiaryEntry } from "../../types";

const INLINE_SEPARATOR = " | ";
const MULTILINE_SEPARATOR = "\n\n––––––––––\n\n";

/**
 * Merge the contents of two diary entries and split old and new text using separators
 */
export default function mergeEntries(
	entriesOld: Array<DiaryEntry>,
	entriesNew: Array<DiaryEntry>,
): Array<DiaryEntry> {
	// Add title and text to existing entry if there already is one for the same day
	const entriesMerged = [...entriesOld];
	entriesNew.forEach(entryNew => {
		const entryToBeUpdated = entriesMerged.find(e => e.id === entryNew.id);
		if (entryToBeUpdated) {
			entryToBeUpdated.title = `${entryToBeUpdated.title}${INLINE_SEPARATOR}${entryNew.title}`;
			entryToBeUpdated.text = `${entryToBeUpdated.text}${MULTILINE_SEPARATOR}${entryNew.text}`;
		} else {
			entriesMerged.push(entryNew);
		}
	});
	return entriesMerged;
}
