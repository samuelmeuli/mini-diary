import { translate } from "../../i18n/i18n";

const editMenu: Electron.MenuItemConstructorOptions = {
	label: translate("edit"),
	submenu: [
		{
			label: translate("undo"),
			role: "undo",
		},
		{
			label: translate("redo"),
			role: "redo",
		},
		{ type: "separator" },
		{
			label: translate("cut"),
			role: "cut",
		},
		{
			label: translate("copy"),
			role: "copy",
		},
		{
			label: translate("paste"),
			role: "paste",
		},
		{
			label: translate("select-all"),
			role: "selectall",
		},
	],
};

export default editMenu;
