const { t } = require('../../i18n/i18n');

module.exports = {
	label: t('window'),
	role: 'window',
	submenu: [
		{
			label: t('minimize'),
			role: 'minimize'
		},
		{
			label: t('close'),
			role: 'close'
		}
	]
};
