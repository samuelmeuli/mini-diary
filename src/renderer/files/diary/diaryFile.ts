import { remote } from "electron";
import path from "path";

import { Metadata } from "../../types";
import { createDate } from "../../utils/dateFormat";
import { loadDirPref } from "../preferences/preferences";

export const FILE_NAME = "mini-diary.txt";
const METADATA = {
	application: remote.app.name,
	version: remote.app.getVersion(),
};

/**
 * Return path to diary file (set in preferences)
 */
export function getDiaryFilePath(): string {
	// Concatenate and return directory preference with file name
	const fileDir = loadDirPref();
	return path.resolve(fileDir, FILE_NAME);
}

/**
 * Return metadata to include in encrypted diary file (consists of app version and date of last
 * write)
 */
export function getMetadata(): Metadata {
	return {
		...METADATA,
		dateUpdated: createDate().toString(),
	};
}
