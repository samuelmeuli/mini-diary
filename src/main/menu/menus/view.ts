import { MenuItemConstructorOptions } from "electron";

import { translate } from "../../i18n/i18n";
import {
	setDaySelectedNext,
	setDaySelectedPrevious,
	setDaySelectedToday,
	setMonthSelectedNext,
	setMonthSelectedPrevious,
	openOverlay,
} from "../../ipcMain/senders";

export default function getViewMenu(): MenuItemConstructorOptions {
	return {
		label: translate("view"),
		submenu: [
			{
				label: `${translate("go-to-today")}`,
				id: "goToToday",
				accelerator: "CmdOrCtrl+T",
				click(): void {
					setDaySelectedToday();
				},
			},
			{
				label: `${translate("go-to-date")}…`,
				id: "goToDate",
				accelerator: "CmdOrCtrl+Shift+T",
				click(): void {
					openOverlay("go-to-date");
				},
			},
			{ type: "separator" },
			{
				label: translate("previous-day"),
				id: "previousDay",
				accelerator: "Left",
				click(): void {
					setDaySelectedPrevious();
				},
			},
			{
				label: translate("next-day"),
				id: "nextDay",
				accelerator: "Right",
				click(): void {
					setDaySelectedNext();
				},
			},
			{ type: "separator" },
			{
				label: translate("previous-month"),
				id: "previousMonth",
				accelerator: "CmdOrCtrl+Left",
				click(): void {
					setMonthSelectedPrevious();
				},
			},
			{
				label: translate("next-month"),
				id: "nextMonth",
				accelerator: "CmdOrCtrl+Right",
				click(): void {
					setMonthSelectedNext();
				},
			},
		],
	};
}
