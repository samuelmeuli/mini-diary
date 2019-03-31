import semver from "semver";

import { createBackup } from "./backupFile";

/**
 * v2.0.0: Migrate plain text entries to Markdown entries (replace \n with \n\n)
 */
function migrateToMarkdown(data: DiaryFile): DiaryFile {
	createBackup();

	const { metadata, entries } = data;
	const dataMigrated: DiaryFile = {
		metadata,
		entries: {},
	};

	// Replace \n with \n\n in the text part of all diary entries
	Object.entries(entries).forEach(([indexDate, entry]) => {
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
export function performMigrations(data: DiaryFile): DiaryFile {
	const diaryFileVersion = data.metadata.version;

	if (semver.lt(diaryFileVersion, "2.0.0")) {
		return migrateToMarkdown(data);
	}
	return data;
}
