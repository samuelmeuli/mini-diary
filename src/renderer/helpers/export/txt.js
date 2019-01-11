import { toDayOneDate } from '../dateUtils';


/**
 * Convert entries to a text string in a format compatible with Day One's TXT import:
 *
 *   [TAB]Date:[TAB][Date]
 *
 *   [Title]
 *
 *   [Text]
 */
export function convertToTxt(entries) {
	let txt = '';

	Object.entries(entries).forEach(([indexDate, entry]) => {
		const { text, title } = entry;

		// Format date
		const dayOneDate = toDayOneDate(indexDate);

		// Build TXT string
		txt += `\tDate:\t${dayOneDate}\n\n${title}\n\n${text}\n\n\n`;
	});

	return txt;
}
