import is from "electron-is";

import { translate } from "../i18n/i18n";
import getAppMenu from "./menus/app";
import getEditMenu from "./menus/edit";
import getFileMenu from "./menus/file";
import getHelpMenu from "./menus/help";
import getViewMenu from "./menus/view";
import getWindowMenu from "./menus/window";
import getPreferencesItem from "./preferencesItem";

export default function getMenuTemplate(): Electron.MenuItemConstructorOptions[] {
	const appMenu = getAppMenu();
	const editMenu = getEditMenu();
	const fileMenu = getFileMenu();
	const helpMenu = getHelpMenu();
	const preferencesItem = getPreferencesItem();
	const viewMenu = getViewMenu();
	const windowMenu = getWindowMenu();

	if (is.macOS()) {
		// Add macOS-specific items
		(editMenu.submenu as Electron.MenuItemConstructorOptions[]).push(
			{ type: "separator" },
			{
				label: translate("speech"),
				submenu: [
					{
						label: translate("start-speaking"),
						role: "startspeaking",
					},
					{
						label: translate("stop-speaking"),
						role: "stopspeaking",
					},
				],
			},
		);
		windowMenu.submenu = [
			{
				label: translate("close"),
				role: "close",
			},
			{
				label: translate("minimize"),
				role: "minimize",
			},
			{
				label: translate("zoom"),
				role: "zoom",
			},
			{ type: "separator" },
			{
				label: translate("bring-all-to-front"),
				role: "front",
			},
		];
	} else {
		// Add preferences under "File" (will be added under "Mini Diary" for macOS)
		(fileMenu.submenu as Electron.MenuItemConstructorOptions[]).push(preferencesItem);
	}

	return [...(is.macOS() ? [appMenu] : []), fileMenu, editMenu, viewMenu, windowMenu, helpMenu];
}
