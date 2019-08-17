import { MenuItemConstructorOptions, shell } from "electron";

import { translate } from "../../i18n/i18n";

const URL_LICENSE = "https://github.com/samuelmeuli/mini-diary/blob/master/LICENSE.md";
const URL_PRIVACY_POLICY = "https://github.com/samuelmeuli/mini-diary/blob/master/PRIVACY.md";
const URL_WEBSITE = "https://minidiary.app";

export default function getHelpMenu(): MenuItemConstructorOptions {
	return {
		label: translate("help"),
		role: "help",
		submenu: [
			{
				label: translate("website"),
				click(): void {
					shell.openExternal(URL_WEBSITE);
				},
			},
			{ type: "separator" },
			{
				label: translate("license"),
				click(): void {
					shell.openExternal(URL_LICENSE);
				},
			},
			{
				label: translate("privacy-policy"),
				click(): void {
					shell.openExternal(URL_PRIVACY_POLICY);
				},
			},
		],
	};
}
