import { MenuItemConstructorOptions } from "electron";

import { translate } from "../i18n/i18n";
import { openOverlay } from "../ipcMain/senders";

export default function getPreferencesItem(): MenuItemConstructorOptions {
	return {
		label: `${translate("preferences")}…`,
		id: "preferences",
		accelerator: "CmdOrCtrl+,",
		click(): void {
			openOverlay("preferences");
		},
	};
}
