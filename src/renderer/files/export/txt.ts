import { toDayOneDate } from "../../utils/dateFormat";

/**
 * Convert entries to a text string in a format compatible with Day One's TXT import:
 *
 *   [TAB]Date:[TAB][Date]
 *
 *   [Title]
 *
 *   [Text]
 */
export function convertToTxt(entries: [string, DiaryEntry][]): Promise<string> {
	return new Promise(resolve => {
		let txt = "";

		entries.forEach(([indexDate, entry]) => {
			const { text, title } = entry;

			// Format date
			const dayOneDate = toDayOneDate(new Date(indexDate));

			// Build TXT string
			txt += `\tDate:\t${dayOneDate}\n\n`; // Date
			if (title) {
				txt += `${title}\n\n`; // Title
			}
			if (text) {
				txt += `${text}\n\n`; // Text
			}
			txt += "\n";
		});

		resolve(txt);
	});
}
