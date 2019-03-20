import is from "electron-is";

import { translate } from "../i18n/i18n";
import appMenu from "./menus/app";
import editMenu from "./menus/edit";
import fileMenu from "./menus/file";
import helpMenu from "./menus/help";
import viewMenu from "./menus/view";
import windowMenu from "./menus/window";
import preferencesItem from "./preferencesItem";

export const getMenuTemplate = (): Electron.MenuItemConstructorOptions[] => {
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
};
