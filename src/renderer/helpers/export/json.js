/**
 * Convert entries to a JSON string
 */
export function convertToJson(entries) {
	const json = {};

	entries.forEach(([indexDate, entry]) => {
		json[indexDate] = entry;
	});

	return JSON.stringify(json, null, '\t');
}
