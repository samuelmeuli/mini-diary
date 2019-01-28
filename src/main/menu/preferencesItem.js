const { showPreferences } = require('../ipcMain/senders');
const { t } = require('../i18n/i18n');

module.exports = {
	label: `${t('preferences')}…`,
	id: 'preferences',
	accelerator: 'CmdOrCtrl+,',
	click() {
		showPreferences();
	}
};
