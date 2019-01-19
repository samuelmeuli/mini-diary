import elasticlunr from 'elasticlunr';


let index;


/**
 * Create a new search index form all existing diary entries
 */
export function createIndex(entries) {
	// Define index structure
	index = elasticlunr();
	index.addField('title');
	index.addField('text');
	index.setRef('date');
	index.saveDocument(true);

	// Index all existing diary entries
	Object.entries(entries).forEach(([date, entry]) => {
		index.addDoc({
			date,
			...entry
		});
	});
}


/**
 * Add the specified entry to the index if it doesn't exist. If it exists, update it
 */
export function createOrUpdateIndexDoc(date, entry) {
	const doc = {
		date,
		title: entry.title,
		text: entry.text
	};
	index.updateDoc(doc);
}


/**
 * Remove the specified entry from the index
 */
export function deleteIndexDoc(date) {
	index.removeDocByRef(date);
}


/**
 * Search index for the provided key and return the results
 */
export function searchIndex(key) {
	const results = index.search(key, {
		expand: true
	});
	results.sort((a, b) => b.ref.localeCompare(a.ref));
	return results;
}
