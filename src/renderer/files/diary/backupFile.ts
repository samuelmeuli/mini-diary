import { remote } from "electron";
import fs from "fs";
import path from "path";

import { createDate, toFileNameDate } from "../../utils/dateFormat";
import { copyFile } from "../fileAccess";
import { getDiaryFilePath } from "./diaryFile";

const PREF_DIR = remote.app.getPath("userData");
const BACKUP_DIR = path.join(PREF_DIR, "backups");
const FILES_TO_KEEP = 50;

/**
 * Create backup directory at specified path if it doesn't exist yet
 */
function createBackupDir(dir: string): void {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}

/**
 * Create a backup of the diary by copying the diary file to the backup directory
 */
function createBackupFile(dir: string): void {
	const dateTime = toFileNameDate(createDate());
	const diaryFilePath = getDiaryFilePath();
	const backupPath = path.join(dir, `backup-${dateTime}.txt`);
	copyFile(diaryFilePath, backupPath);
}

/**
 * Delete old backup files until the requested number of files remain
 */
function deleteOldBackupFiles(dir: string, filesToKeep: number): void {
	const files = fs.readdirSync(dir);
	const txtFiles = files.filter((fileName: string) => fileName.endsWith(".txt"));
	if (txtFiles.length > filesToKeep) {
		for (let fileIndex = 0; fileIndex < txtFiles.length - filesToKeep; fileIndex += 1) {
			const fileToDelete = path.join(BACKUP_DIR, txtFiles[fileIndex]);
			fs.unlinkSync(fileToDelete);
		}
	}
}

/**
 * Create a copy of the encrypted diary file and delete old backup files if necessary
 */
export default function createBackup(): void {
	createBackupDir(BACKUP_DIR);
	deleteOldBackupFiles(BACKUP_DIR, FILES_TO_KEEP);
	createBackupFile(BACKUP_DIR);
}
