import { translate } from "../../i18n/i18n";
import {
	setDaySelectedNext,
	setDaySelectedPrevious,
	setMonthSelectedNext,
	setMonthSelectedPrevious,
} from "../../ipcMain/senders";

const viewMenu: Electron.MenuItemConstructorOptions = {
	label: translate("view"),
	submenu: [
		{
			label: translate("previous-day"),
			id: "previousDay",
			accelerator: "Left",
			click() {
				setDaySelectedPrevious();
			},
		},
		{
			label: translate("next-day"),
			id: "nextDay",
			accelerator: "Right",
			click() {
				setDaySelectedNext();
			},
		},
		{ type: "separator" },
		{
			label: translate("previous-month"),
			id: "previousMonth",
			accelerator: "CmdOrCtrl+Left",
			click() {
				setMonthSelectedPrevious();
			},
		},
		{
			label: translate("next-month"),
			id: "nextMonth",
			accelerator: "CmdOrCtrl+Right",
			click() {
				setMonthSelectedNext();
			},
		},
	],
};

export default viewMenu;
