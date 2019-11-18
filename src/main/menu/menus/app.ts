import { app, MenuItemConstructorOptions } from "electron";

import { translate } from "../../i18n/i18n";
import getPreferencesItem from "../preferencesItem";

const appName = app.name;

export default function getAppMenu(): MenuItemConstructorOptions {
	const preferencesItem = getPreferencesItem();

	return {
		label: appName,
		submenu: [
			{
				label: translate("about-app", { appName }),
				role: "about",
			},
			{ type: "separator" },
			preferencesItem,
			{ type: "separator" },
			{
				label: translate("hide-app", { appName }),
				role: "hide",
			},
			{
				label: translate("hide-others"),
				role: "hideOthers",
			},
			{
				label: translate("show-all"),
				role: "unhide",
			},
			{ type: "separator" },
			{
				label: translate("quit-app", { appName }),
				role: "quit",
			},
		],
	};
}
