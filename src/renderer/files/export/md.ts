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
import { toLocaleWeekday } from "../../utils/dateFormat";

export function convertToMd(entries: [string, DiaryEntry][]): Promise<string> {
	return new Promise(resolve => {
		let md = "# Mini Diary\n\n";

		entries.forEach(([indexDate, entry]) => {
			const { text, title } = entry;

			// Format date
			const dateStr = toLocaleWeekday(new Date(indexDate));

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
