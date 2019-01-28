const { t } = require('../../i18n/i18n');

module.exports = {
	label: t('edit'),
	submenu: [
		{
			label: t('undo'),
			role: 'undo'
		},
		{
			label: t('redo'),
			role: 'redo'
		},
		{ type: 'separator' },
		{
			label: t('cut'),
			role: 'cut'
		},
		{
			label: t('copy'),
			role: 'copy'
		},
		{
			label: t('paste'),
			role: 'paste'
		},
		{
			label: t('select-all'),
			role: 'selectall'
		}
	]
};
