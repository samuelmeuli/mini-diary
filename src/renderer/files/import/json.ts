interface MiniDiaryJson {
	metadata: {
		application: "Mini Diary";
		version: string;
		dateUpdated: string;
	};
	entries: Entries;
}

/**
 * Parse the JSON file and format it as a processable object
 */
export function parseJson(jsonStr: string): Entries {
	const miniDiaryJson = JSON.parse(jsonStr) as MiniDiaryJson;
	const now = new Date().toString();

	const importEntries: Entries = {};
	Object.entries(miniDiaryJson.entries).forEach(([indexDate, entry]: [string, DiaryEntry]) => {
		const { text, title } = entry;

		// Use dateUpdated if defined, otherwise set it to now
		let dateUpdated;
		if ("dateUpdated" in entry) {
			dateUpdated = new Date(entry.dateUpdated).toString();
		} else {
			dateUpdated = now;
		}

		importEntries[indexDate] = {
			dateUpdated,
			title: title.trim(),
			text: text.trim(),
		};
	});
	return importEntries;
}
