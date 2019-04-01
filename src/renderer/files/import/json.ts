import { remote } from "electron";

import { performMigrations } from "../diary/migrations";

/**
 * Parse the JSON file and format it as a processable object
 */
export function parseJson(miniDiaryJson: DiaryFile): Entries {
	let miniDiaryJsonProcessed = { ...miniDiaryJson };
	// If JSON file was created by Mini Diary: Perform data migrations if necessary
	if (miniDiaryJsonProcessed.metadata.application === remote.app.getName()) {
		miniDiaryJsonProcessed = performMigrations(miniDiaryJsonProcessed);
	}

	const now = new Date().toString();
	const importEntries: Entries = {};
	Object.entries(miniDiaryJsonProcessed.entries).forEach(
		([indexDate, entry]: [string, DiaryEntry]) => {
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
		},
	);
	return importEntries;
}
