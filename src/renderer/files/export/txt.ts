import { toDayOneDate } from "../../utils/dateFormat";
import mdToTxt from "../../utils/mdToTxt";

/**
 * Convert entries to a text string in a format compatible with Day One's TXT import:
 *
 *   [TAB]Date:[TAB][Date]
 *
 *   [Title]
 *
 *   [Text]
 */
export async function convertToTxt(entries: [string, DiaryEntry][]): Promise<string> {
	return new Promise(async resolve => {
		let txt = "";

		for (let i = 0; i < entries.length; i += 1) {
			const [indexDate, entry] = entries[i];
			const { text, title } = entry;

			// Format date
			const dayOneDate = toDayOneDate(new Date(indexDate));

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

		resolve(txt);
	});
}
