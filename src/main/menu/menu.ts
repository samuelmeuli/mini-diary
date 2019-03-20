import { Menu } from "electron";

import { getMenuTemplate } from "./template";

const DISABLED_MENU_ITEMS = [
	"exportToJson",
	"exportToMd",
	"exportToPdf",
	"exportToTxt",
	"importFromDayOne",
	"importFromJrnl",
	"importFromJson",
	"lock",
	"previousDay",
	"nextDay",
	"previousMonth",
	"nextMonth",
];

let menu: Menu;

export function initMenu(): void {
	// Build menu
	const template = getMenuTemplate();
	menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

export function disableMenuItems(): void {
	DISABLED_MENU_ITEMS.forEach(id => {
		menu.getMenuItemById(id).enabled = false;
	});
}

export function enableMenuItems(): void {
	DISABLED_MENU_ITEMS.forEach(id => {
		menu.getMenuItemById(id).enabled = true;
	});
}
