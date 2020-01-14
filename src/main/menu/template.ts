import { MenuItemConstructorOptions } from "electron";

import { is } from "electron-util";

import { translate } from "../i18n/i18n";
import getAppMenu from "./menus/app";
import getEditMenu from "./menus/edit";
import getFileMenu from "./menus/file";
import getHelpMenu from "./menus/help";
import getViewMenu from "./menus/view";
import getWindowMenu from "./menus/window";
import getPreferencesItem from "./preferencesItem";

export default function getMenuTemplate(): MenuItemConstructorOptions[] {
	const appMenu = getAppMenu();
	const editMenu = getEditMenu();
	const fileMenu = getFileMenu();
	const helpMenu = getHelpMenu();
	const preferencesItem = getPreferencesItem();
	const viewMenu = getViewMenu();
	const windowMenu = getWindowMenu();

	if (is.macos) {
		// Add macOS-specific items
		(editMenu.submenu as MenuItemConstructorOptions[]).push(
			{ type: "separator" },
			{
				label: translate("speech"),
				submenu: [
					{
						label: translate("start-speaking"),
						role: "startSpeaking",
					},
					{
						label: translate("stop-speaking"),
						role: "stopSpeaking",
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
		(fileMenu.submenu as MenuItemConstructorOptions[]).push(preferencesItem);
	}

	return [...(is.macos ? [appMenu] : []), fileMenu, editMenu, viewMenu, windowMenu, helpMenu];
}
