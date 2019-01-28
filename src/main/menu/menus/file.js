const {
	exportToJson,
	exportToMd,
	exportToPdf,
	exportToTxt,
	importDayOne,
	importJrnl,
	importJson,
	lock
} = require('../../ipcMain/senders');
const { t } = require('../../i18n/i18n');

module.exports = {
	label: t('file'),
	submenu: [
		{
			label: t('lock-diary'),
			id: 'lock',
			accelerator: 'CmdOrCtrl+L',
			click() {
				lock();
			}
		},
		{ type: 'separator' },
		{
			label: t('import'),
			submenu: [
				{
					label: `${t('import-from-format', { format: 'Day One' })}…`,
					id: 'importFromDayOne',
					click() {
						importDayOne();
					}
				},
				{
					label: `${t('import-from-format', { format: 'jrnl' })}…`,
					id: 'importFromJrnl',
					click() {
						importJrnl();
					}
				},
				{
					label: `${t('import-from-format', { format: 'JSON' })}…`,
					id: 'importFromJson',
					click() {
						importJson();
					}
				}
			]
		},
		{
			label: t('export'),
			id: 'export',
			submenu: [
				{
					label: `${t('export-to-format', { format: 'PDF' })}…`,
					id: 'exportToPdf',
					click() {
						exportToPdf();
					}
				},
				{
					label: `${t('export-to-format', { format: 'Markdown' })}…`,
					id: 'exportToMd',
					click() {
						exportToMd();
					}
				},
				{
					label: `${t('export-to-format', { format: 'TXT' })}…`,
					id: 'exportToTxt',
					click() {
						exportToTxt();
					}
				},
				{
					label: `${t('export-to-format', { format: 'JSON' })}…`,
					id: 'exportToJson',
					click() {
						exportToJson();
					}
				}
			]
		}
	]
};
