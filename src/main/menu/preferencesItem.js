const { translate } = require("../i18n/i18n");
const { showPref } = require("../ipcMain/senders");

module.exports = {
	label: `${translate("preferences")}…`,
	id: "preferences",
	accelerator: "CmdOrCtrl+,",
	click() {
		showPref();
	},
};
