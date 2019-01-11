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
	let md = '# Mini Diary\n\n';

	entries.forEach(([indexDate, entry]) => {
		const { text, title } = entry;

		// Replace single with double line breaks to get Markdown paragraphs
		const textMd = text.replace(/\n/g, '\n\n');

		// Format date
		const dateStr = toDateString(indexDate);

		// Build Markdown string
		md += `## ${dateStr}\n\n`; // Date
		if (title) {
			md += `### ${title}\n\n`; // Title
		}
		if (textMd) {
			md += `${textMd}\n\n`; // Text
		}
		md += '\n';
	});

	return md;
}
