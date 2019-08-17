import { MenuItemConstructorOptions } from "electron";

import { translate } from "../../i18n/i18n";

export default function getWindowMenu(): MenuItemConstructorOptions {
	return {
		label: translate("window"),
		role: "window",
		submenu: [
			{
				label: translate("minimize"),
				role: "minimize",
			},
			{
				label: translate("close"),
				role: "close",
			},
		],
	};
}
