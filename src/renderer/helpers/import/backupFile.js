import moment from 'moment';

import { copyFile } from '../fileAccess';

const BACKUP_TIME_FORMAT = 'YYYY-MM-DD-HH[h]mm';


/**
 * Create a copy of the (encrypted) diary file and append "-backup-[dateTime]" to its name
 */
export function backupFile(diaryFilePath) {
	const dateTime = moment().format(BACKUP_TIME_FORMAT);
	const backupPath = `${diaryFilePath.split('.')[0]}-backup-${dateTime}.txt`;
	copyFile(diaryFilePath, backupPath);
}
