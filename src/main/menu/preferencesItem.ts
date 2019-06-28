import { translate } from "../i18n/i18n";
import { showPrefOverlay } from "../ipcMain/senders";

export default {
	label: `${translate("preferences")}…`,
	id: "preferences",
	accelerator: "CmdOrCtrl+,",
	click(): void {
		showPrefOverlay();
	},
};
