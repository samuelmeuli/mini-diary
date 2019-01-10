import { formatDate } from '../dateUtils';


/**
 * Parse the JSON file and format it as a processable object
 */
export function parseJson(jsonStr) {
	const json = JSON.parse(jsonStr);
	const { entries } = json;
	const now = new Date().toString();

	const importObj = {};
	Object.entries(entries).forEach(([dateFormatted, entry]) => {
		const { text, title } = entry;

		// Validate dateFormatted
		const dateFormattedValidated = formatDate(dateFormatted);

		// Use dateUpdated if defined, otherwise set it to now
		let dateUpdated;
		if ('dateUpdated' in entry) {
			dateUpdated = new Date(entry.dateUpdated).toString();
		} else {
			dateUpdated = now;
		}

		importObj[dateFormattedValidated] = {
			dateUpdated,
			title,
			text
		};
	});
	return importObj;
}
