import { translate } from "../../i18n/i18n";

const windowMenu: Electron.MenuItemConstructorOptions = {
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

export default windowMenu;
