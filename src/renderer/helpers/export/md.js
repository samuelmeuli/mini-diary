import { toDateString } from '../dateUtils';


/**
 * Convert entries to a Markdown string of the following form:
 *
 *   # Mini Diary
 *
 *   ## [Date]
 *
 *   ### [Title]
 *
 *   [Text]
 */
export function convertToMd(entries) {
	let md = '# Mini Diary';

	entries.forEach(([indexDate, entry]) => {
		const { text, title } = entry;

		// Replace single with double line breaks to get Markdown paragraphs
		const textMd = text.replace(/\n/g, '\n\n');

		// Format date
		const dateStr = toDateString(indexDate);

		// Build Markdown string
		md += `\n\n## ${dateStr}\n\n### ${title}\n\n${textMd}\n`;
	});

	return md;
}
