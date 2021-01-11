import MiniSearch, { SearchResult as MiniSearchResult } from "minisearch";

import { DiaryEntry, Entries } from "../types";
import mdToTxt from "./mdToTxt";

interface IndexDoc {
	id: string;
	title: string;
	text: string;
	indexDate: string;
}

export interface SearchResult {
	id: string;
	indexDate: string;
}

let index: MiniSearch;

// Default `SPACE_OR_PUNCTUATION` list of the MiniSearch library, excluding "@" and "#"
const SPACE_OR_PUNCTUATION = /[\n\r -"%-*,-/:;?[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u;

/**
 * Create a document to be stored in the index from the provided diary entry
 */
async function createIndexDoc(indexDate: string, entry: DiaryEntry): Promise<IndexDoc> {
	return {
		id: entry.id,
		title: entry.title,
		text: await mdToTxt(entry.text),
		indexDate,
	};
}

/**
 * Create a new search index form all existing diary entries
 */
export async function createIndex(entries: Entries): Promise<void> {
	// Define index structure
	index = new MiniSearch({
		fields: ["title", "text"],
		storeFields: ["indexDate"],
		// Function for splitting fields into individual terms
		tokenize: (str: string): string[] => str.split(SPACE_OR_PUNCTUATION),
	});

	// Index all existing diary entries
	const indexDocs = await Promise.all(
		Object.entries(entries)
			.map(([indexDate, entriesForTheDay]) =>
				entriesForTheDay.map(entry => createIndexDoc(indexDate, entry)),
			)
			.flat(),
	);
	await index.addAllAsync(indexDocs);
}

/**
 * Add the specified entry to the index if it doesn't exist. If it exists, update it
 */
export async function addIndexDoc(indexDate: string, entry: DiaryEntry): Promise<void> {
	const doc = await createIndexDoc(indexDate, entry);
	index.add(doc);
}

/**
 * Remove the specified entry from the index
 */
export async function removeIndexDoc(indexDate: string, entry: DiaryEntry): Promise<void> {
	const doc = await createIndexDoc(indexDate, entry);
	index.remove(doc);
}

/**
 * Update the specified index entry
 */
export async function updateIndexDoc(
	indexDate: string,
	entryOld: DiaryEntry,
	entryUpdated: DiaryEntry,
): Promise<void> {
	await removeIndexDoc(indexDate, entryOld);
	await addIndexDoc(indexDate, entryUpdated);
}

/**
 * Search index for the provided key and return the sorted results' indexDates
 */
export function searchIndex(key: string): SearchResult[] {
	const res = index
		.search(key, { prefix: true })
		.map(
			(searchResult: MiniSearchResult): SearchResult => ({
				id: searchResult.id,
				indexDate: searchResult.indexDate,
			}),
		)
		.sort()
		.reverse();
	return res;
}
