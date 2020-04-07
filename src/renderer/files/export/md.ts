import { Entries } from "../../types";
import { fromIndexDate, toLocaleWeekday } from "../../utils/dateFormat";
import sortEntries from "./sortEntries";

/**
 * Convert entries to a Markdown string of the following form:
 *
 *   # Mini Diary
 *
 *   ## [Date]
 *
 *   **[Title]**
 *
 *   [Text]
 */
export function convertToMd(entries: Entries): Promise<string> {
	return new Promise((resolve): void => {
		const entriesSorted = sortEntries(entries);
		let md = "# Mini Diary\n\n";

		entriesSorted.forEach(([indexDate, entry]): void => {
			const { text, title } = entry;

			// Format date
			const dateStr = toLocaleWeekday(fromIndexDate(indexDate));

			// Build Markdown string
			md += `## ${dateStr}\n\n`; // Date
			if (title) {
				md += `**${title}**\n\n`; // Title
			}
			if (text) {
				md += `${text}\n\n`; // Text
			}
			md += "\n";
		});

		resolve(md);
	});
}
