import { translate } from "../i18n/i18n";
import { showPref } from "../ipcMain/senders";

export default {
	label: `${translate("preferences")}…`,
	id: "preferences",
	accelerator: "CmdOrCtrl+,",
	click() {
		showPref();
	},
};
