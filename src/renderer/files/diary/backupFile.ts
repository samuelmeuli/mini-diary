import { toFilenameDate } from "../../utils/dateFormat";
import { copyFile } from "../fileAccess";
import { getDiaryFilePath } from "./diaryFile";

/**
 * Create a copy of the (encrypted) diary file and append "-backup-[dateTime]" to its name
 */
export function createBackup(): void {
	const diaryFilePath = getDiaryFilePath();
	const dateTime = toFilenameDate(new Date());
	const backupPath = `${diaryFilePath.split(".")[0]}-backup-${dateTime}.txt`;
	copyFile(diaryFilePath, backupPath);
}
