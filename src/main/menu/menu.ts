import { Menu } from "electron";

import getMenuTemplate from "./template";

// IDs of menu items to disable when the diary is locked
const DISABLED_MENU_ITEMS = [
	"exportJsonMiniDiary",
	"exportMd",
	"exportPdf",
	"exportTxtDayOne",
	"goToDate",
	"goToToday",
	"importJsonDayOne",
	"importJsonJrnl",
	"importJsonMiniDiary",
	"importTxtDayOne",
	"lock",
	"nextDay",
	"nextMonth",
	"previousDay",
	"previousMonth",
	"statistics",
];

// Application menu
let menu: Menu;

/**
 * Disable all menu items with IDs specified in the DISABLED_MENU_ITEMS array
 */
export function disableMenuItems(): void {
	DISABLED_MENU_ITEMS.forEach((id): void => {
		menu.getMenuItemById(id).enabled = false;
	});
}

/**
 * Enable all menu items with IDs specified in the DISABLED_MENU_ITEMS array
 */
export function enableMenuItems(): void {
	DISABLED_MENU_ITEMS.forEach((id): void => {
		menu.getMenuItemById(id).enabled = true;
	});
}

/**
 * Build the application menu from the template, activate it and disable all menu items which should
 * be inaccessible when the diary is locked
 */
export function buildMenu(): void {
	const template = getMenuTemplate();
	menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
	disableMenuItems();
}
