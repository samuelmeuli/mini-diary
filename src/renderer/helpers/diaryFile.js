import path from 'path';

import { loadDirPref } from './preferences';

const { app } = window.require('electron').remote;

export const FILE_NAME = 'mini-diary.txt';
const METADATA = {
	application: app.getName(),
	version: app.getVersion()
};

/**
 * Return path to diary file (set in preferences)
 */
export function getDiaryFilePath() {
	// Concatenate and return directory preference with file name
	const fileDir = loadDirPref();
	return path.resolve(fileDir, FILE_NAME);
}

/**
 * Return metadata to include in encrypted diary file (consists of app version and date of last
 * write)
 */
export function getMetadata() {
	return {
		...METADATA,
		dateUpdated: new Date().toString()
	};
}
