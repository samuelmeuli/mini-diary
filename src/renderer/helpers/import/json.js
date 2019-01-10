import { toIndexDate } from '../dateUtils';


/**
 * Parse the JSON file and format it as a processable object
 */
export function parseJson(jsonStr) {
	const json = JSON.parse(jsonStr);
	const { entries } = json;
	const now = new Date().toString();

	const importObj = {};
	Object.entries(entries).forEach(([indexDate, entry]) => {
		const { text, title } = entry;

		// Validate indexDate
		const indexDateValidated = toIndexDate(indexDate);

		// Use dateUpdated if defined, otherwise set it to now
		let dateUpdated;
		if ('dateUpdated' in entry) {
			dateUpdated = new Date(entry.dateUpdated).toString();
		} else {
			dateUpdated = now;
		}

		importObj[indexDateValidated] = {
			dateUpdated,
			title: title.trim(),
			text: text.trim()
		};
	});
	return importObj;
}
