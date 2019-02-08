const { showPreferences } = require('../ipcMain/senders');
const { translate } = require('../i18n/i18n');

module.exports = {
	label: `${translate('preferences')}…`,
	id: 'preferences',
	accelerator: 'CmdOrCtrl+,',
	click() {
		showPreferences();
	}
};
