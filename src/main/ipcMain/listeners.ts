import { ipcMain, IpcMessageEvent } from "electron";

import { getTranslations, getUsedLang, translate } from "../i18n/i18n";
import { disableMenuItems, enableMenuItems } from "../menu/menu";
import { getWindow } from "../window";

export default function initIpcListeners(): void {
	// Localization

	ipcMain.on("getLang", (e: IpcMessageEvent): void => {
		e.returnValue = getUsedLang();
	});

	ipcMain.on(
		"getTranslation",
		(e: IpcMessageEvent, i18nKey: string, substitutions: Record<string, string>): void => {
			e.returnValue = translate(i18nKey, substitutions);
		},
	);

	ipcMain.on("getTranslations", (e: IpcMessageEvent): void => {
		e.returnValue = getTranslations();
	});

	// Menu items

	ipcMain.on("disableMenuItems", (): void => {
		disableMenuItems();
	});

	ipcMain.on("enableMenuItems", (): void => {
		enableMenuItems();
	});

	// Window

	ipcMain.on("toggleWindowSize", (): void => {
		const window = getWindow();
		if (window.isMaximized()) {
			window.unmaximize();
		} else {
			window.maximize();
		}
	});
}
