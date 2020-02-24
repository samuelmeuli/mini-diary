import { Entries, DiaryEntry } from "../../types";

/**
 * Convert an Entries object to an array of diary entries sorted by date
 */
export default function sortEntries(entries: Entries): [string, DiaryEntry][] {
	return Object.entries(entries).sort((a, b) => a[0].localeCompare(b[0]));
}
