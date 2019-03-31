import { getMetadata } from "../diary/diaryFile";

/**
 * Convert entries to a JSON string
 */
export function convertToJson(entries: [string, DiaryEntry][]): Promise<string> {
	return new Promise(resolve => {
		const jsonEntries: Entries = {};

		// Convert sorted array back to object
		entries.forEach(([indexDate, entry]) => {
			jsonEntries[indexDate] = entry;
		});

		// Add metadata
		const content: DiaryFile = {
			metadata: getMetadata(),
			entries: jsonEntries,
		};
		resolve(JSON.stringify(content, null, "\t"));
	});
}
