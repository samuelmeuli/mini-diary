import { ImportEntry, DiaryEntry, Entries } from "../../types";
import mergeEntries from "./mergeEntries";

/**
 * Loop over all entries of the provided parsedEntries array, apply the provided getContent function
 * to each of them (to obtain indexDate, dateUpdated, title and text) and combine them in an Entries
 * object. If there are multiple entries for a day, merge them using separator strings
 */
export default function buildEntries(
	parsedEntries: ImportEntry[],
	getContent: (parsedEntry: ImportEntry) => { indexDate: string; entry: DiaryEntry },
): Entries {
	const entriesToImport: Entries = {};

	parsedEntries.forEach((parsedEntry: ImportEntry): void => {
		// Get date, title and text from entry
		const { indexDate, entry: entryNew } = getContent(parsedEntry);

		if (indexDate in entriesToImport) {
			const entryOld = entriesToImport[indexDate];
			entriesToImport[indexDate] = mergeEntries(entryOld, entryNew);
		} else {
			entriesToImport[indexDate] = entryNew;
		}
	});

	return entriesToImport;
}
