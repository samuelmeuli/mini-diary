const { showPreferences } = require('../ipcMain/senders');


module.exports = {
	label: 'Preferences…',
	accelerator: 'CmdOrCtrl+,',
	click() {
		showPreferences();
	}
};
