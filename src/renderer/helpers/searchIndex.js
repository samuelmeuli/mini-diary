import elasticlunr from 'elasticlunr';
import { fileExists, readFile, writeFile } from './fileAccess';

const { app } = window.require('electron').remote;

const PREF_DIR = `${app.getPath('appData')}/${app.getName()}`;
const INDEX_PATH = `${PREF_DIR}/search-index.txt`;

let index;


/**
 * Encrypt and save search index to disk
 */
export function writeIndex(hashedPassword) {
	try {
		writeFile(INDEX_PATH, hashedPassword, index);
	} catch (err) {
		console.error(`Could not write search index to disk: ${err}`);
	}
}


/**
 * Create a new search index form all existing diary entries
 */
export function createIndex(entries, hashedPassword) {
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

	// Persist index on disk
	writeIndex(hashedPassword);
}


/**
 * Load encrypted search index from disk. Create a new one on error or if the file doesn't exist
 */
export function readIndex(entries, hashedPassword) {
	if (!fileExists(INDEX_PATH)) {
		createIndex(entries, hashedPassword);
	} else {
		try {
			const indexDump = readFile(INDEX_PATH, hashedPassword);
			index = elasticlunr.Index.load(indexDump);
		} catch (err) {
			createIndex(entries, hashedPassword);
		}
	}
}


/**
 * Update the specified index entry
 */
export function updateIndex(date, entry) {
	const doc = {
		date,
		title: entry.title,
		text: entry.text
	};
	index.updateDoc(doc);
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
