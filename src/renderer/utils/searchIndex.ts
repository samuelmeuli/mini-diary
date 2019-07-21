import MiniSearch from "minisearch";

import mdToTxt from "./mdToTxt";

interface IndexDoc {
	indexDate: string;
	title: string;
	text: string;
}

let index: any;

/**
 * Create a document to be stored in the index from the provided diary entry
 */
async function createIndexDoc(indexDate: string, entry: DiaryEntry): Promise<IndexDoc> {
	return {
		indexDate,
		title: entry.title,
		text: await mdToTxt(entry.text),
	};
}

/**
 * Create a new search index form all existing diary entries
 */
export async function createIndex(entries: Entries): Promise<void> {
	// Define index structure
	index = new MiniSearch({ fields: ["title", "text"], idField: "indexDate" });

	// Index all existing diary entries
	const indexDocs = await Promise.all(
		Object.entries(entries).map(
			async ([indexDate, entry]): Promise<IndexDoc> => createIndexDoc(indexDate, entry),
		),
	);
	await index.addAllAsync(indexDocs);
}

/**
 * Add the specified entry to the index if it doesn't exist. If it exists, update it
 */
export async function addIndexDoc(indexDate: IndexDate, entry: DiaryEntry): Promise<void> {
	const doc = await createIndexDoc(indexDate, entry);
	index.add(doc);
}

/**
 * Remove the specified entry from the index
 */
export async function removeIndexDoc(indexDate: IndexDate, entry: DiaryEntry): Promise<void> {
	const doc = await createIndexDoc(indexDate, entry);
	index.remove(doc);
}

/**
 * Update the specified index entry
 */
export async function updateIndexDoc(
	indexDate: IndexDate,
	entryOld: DiaryEntry,
	entryUpdated: DiaryEntry,
): Promise<void> {
	await removeIndexDoc(indexDate, entryOld);
	await addIndexDoc(indexDate, entryUpdated);
}

/**
 * Search index for the provided key and return the sorted results' indexDates
 */
export function searchIndex(key: string): string[] {
	const res = index
		.search(key, { prefix: true })
		.map((searchResult: any): string => searchResult.id)
		.sort()
		.reverse();
	return res;
}
