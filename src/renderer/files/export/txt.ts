import { Entries } from "../../types";
import { fromIndexDate, toDayOneDate } from "../../utils/dateFormat";
import mdToTxt from "../../utils/mdToTxt";
import sortEntries from "./sortEntries";

/**
 * Convert entries to a text string in a format compatible with Day One's TXT import:
 *
 *   [TAB]Date:[TAB][Date]
 *
 *   [Title]
 *
 *   [Text]
 */
export async function convertToDayOneTxt(entries: Entries): Promise<string> {
	const entriesSorted = sortEntries(entries);
	let txt = "";

	for (let i = 0; i < entriesSorted.length; i += 1) {
		const [indexDate, entry] = entriesSorted[i];
		const { text, title } = entry;

		// Format date
		const dayOneDate = toDayOneDate(fromIndexDate(indexDate));

		// Build TXT string
		txt += `\tDate:\t${dayOneDate}\n\n`; // Date
		if (title) {
			txt += `${title}\n\n`; // Title
		}
		if (text) {
			// eslint-disable-next-line no-await-in-loop
			const textTxt = await mdToTxt(text);
			txt += `${textTxt}\n\n`; // Text
		}
		txt += "\n";
	}

	return txt;
}
