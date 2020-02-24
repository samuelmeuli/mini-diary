import { DiaryEntry } from "../../types";

const INLINE_SEPARATOR = " | ";
const MULTILINE_SEPARATOR = "\n\n––––––––––\n\n";

/**
 * Merge the contents of two diary entries and split old and new text using separators
 */
export default function mergeEntries(entryOld: DiaryEntry, entryNew: DiaryEntry): DiaryEntry {
	// Add title and text to existing entry if there already is one for the same day
	const entryMerged = { ...entryOld };
	if (entryOld.title) {
		entryMerged.title = `${entryOld.title}${INLINE_SEPARATOR}${entryNew.title}`;
	}
	if (entryOld.text) {
		entryMerged.text = `${entryOld.text}${MULTILINE_SEPARATOR}${entryNew.text}`;
	}
	return entryMerged;
}
