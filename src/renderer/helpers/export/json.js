/**
 * Convert entries to a JSON string
 */
export function convertToJson(entries) {
	return new Promise((resolve) => {
		const json = {};

		entries.forEach(([indexDate, entry]) => {
			json[indexDate] = entry;
		});

		resolve(JSON.stringify(json, null, '\t'));
	});
}
