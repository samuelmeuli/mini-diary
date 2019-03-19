import elasticlunr from "elasticlunr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let index: any;

/**
 * Create a new search index form all existing diary entries
 */
export function createIndex(entries: Entries): void {
	// Define index structure
	index = elasticlunr();
	index.addField("title");
	index.addField("text");
	index.setRef("date");
	index.saveDocument(true);

	// Index all existing diary entries
	Object.entries(entries).forEach(([indexDate, entry]) => {
		index.addDoc({
			date: indexDate,
			title: entry.title,
			text: entry.text,
		});
	});
}

/**
 * Add the specified entry to the index if it doesn't exist. If it exists, update it
 */
export function createOrUpdateIndexDoc(date: IndexDate, entry: DiaryEntry): void {
	const doc = {
		date,
		title: entry.title,
		text: entry.text,
	};
	index.updateDoc(doc);
}

/**
 * Remove the specified entry from the index
 */
export function deleteIndexDoc(date: IndexDate): void {
	index.removeDocByRef(date);
}

/**
 * Search index for the provided key and return the results
 */
export function searchIndex(key: string): SearchResult[] {
	const results = index.search(key, {
		expand: true,
	});
	results.sort((a: SearchResult, b: SearchResult) => b.ref.localeCompare(a.ref));
	return results;
}
