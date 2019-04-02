import { toFilenameDate } from "../../utils/dateFormat";
import { copyFile } from "../fileAccess";
import { getDiaryFilePath } from "./diaryFile";

const FILE_NAME_REGEX = /\.[^/.]+$/;

/**
 * Create a copy of the (encrypted) diary file and append "-backup-[dateTime]" to its name
 */
export function createBackup(): void {
	const diaryFilePath = getDiaryFilePath();
	const dateTime = toFilenameDate(new Date());

	// Generate path to backup file: Remove file extension, append "-backup-DATE.txt"
	const backupPath = `${diaryFilePath.replace(FILE_NAME_REGEX, "")}-backup-${dateTime}.txt`;
	copyFile(diaryFilePath, backupPath);
}
