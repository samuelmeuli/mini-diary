import semver from "semver";
import { v4 } from "uuid";

import { MiniDiaryJson, DiaryEntry } from "../../types";

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
	Object.entries(entries).forEach(([indexDate, entriesOfTheDay]): void => {
		const entriesUpdated = entriesOfTheDay.map(entry => {
			const { text } = entry;
			return {
				...entry,
				text: text.replace(/\n/g, "\n\n"),
			};
		});

		dataMigrated.entries[indexDate] = entriesUpdated;
	});

	return dataMigrated;
}

/**
 * v3.4.0: Migrate single entry per day to multiple
 */
function migrateToMultipleEntriesPerDay(data: MiniDiaryJson): MiniDiaryJson {
	const { metadata, entries } = data;
	const dataMigrated: MiniDiaryJson = {
		metadata,
		entries: {},
	};

	// If its not array put the entry in an array
	Object.entries(entries).forEach(([indexDate, entriesOfTheDay]): void => {
		if (entriesOfTheDay instanceof Array) {
			dataMigrated.entries[indexDate] = entriesOfTheDay;
		} else {
			const entry = entriesOfTheDay as DiaryEntry;
			dataMigrated.entries[indexDate] = [
				{ id: v4(), title: entry.title, text: entry.text, dateUpdated: entry.dateUpdated },
			];
		}
	});

	return dataMigrated;
}

/**
 * Compare app version with diary file version, perform data migrations if necessary
 */
export function performMigrations(data: MiniDiaryJson): MiniDiaryJson {
	let migratedData = { ...data };
	const diaryFileVersion = migratedData.metadata.version;

	if (semver.lt(diaryFileVersion, "3.4.0")) {
		migratedData = migrateToMultipleEntriesPerDay(data);
	}

	if (semver.lt(diaryFileVersion, "2.0.0")) {
		migratedData = migrateToMarkdown(data);
	}

	return migratedData;
}
