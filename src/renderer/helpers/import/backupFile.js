import { toFilenameDate } from '../dateFormat';
import { copyFile } from '../fileAccess';

/**
 * Create a copy of the (encrypted) diary file and append "-backup-[dateTime]" to its name
 */
export function backupFile(diaryFilePath) {
	const dateTime = toFilenameDate(new Date());
	const backupPath = `${diaryFilePath.split('.')[0]}-backup-${dateTime}.txt`;
	copyFile(diaryFilePath, backupPath);
}
