import semver from "semver";

import { MiniDiaryJson } from "../../types";

/**
 * v2.0.0: Migrate plain text entries to Markdown entries (replace \n with \n\n)
 */
function migrateToMarkdown(data: MiniDiaryJson): MiniDiaryJson {
	const { metadata, entries } = data;
	const dataMigrated: MiniDiaryJson = {
		metadata,
		entries: {},
	};

	// Replace \n with \n\n in the text part of all diary entries
	Object.entries(entries).forEach(([indexDate, entry]): void => {
		const { text } = entry;
		const entryUpdated = {
			...entry,
			text: text.replace(/\n/g, "\n\n"),
		};
		dataMigrated.entries[indexDate] = entryUpdated;
	});

	return dataMigrated;
}

/**
 * Compare app version with diary file version, perform data migrations if necessary
 */
export function performMigrations(data: MiniDiaryJson): MiniDiaryJson {
	const diaryFileVersion = data.metadata.version;

	if (semver.lt(diaryFileVersion, "2.0.0")) {
		return migrateToMarkdown(data);
	}
	return data;
}
