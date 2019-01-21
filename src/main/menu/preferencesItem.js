const { showPreferences } = require('../ipcMain/senders');


module.exports = {
	label: 'Preferences…',
	id: 'preferences',
	accelerator: 'CmdOrCtrl+,',
	click() {
		showPreferences();
	}
};
