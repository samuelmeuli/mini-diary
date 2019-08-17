import { ipcMain, IpcMainEvent } from "electron";

import { Translations } from "../../shared/types";
import { getTranslations, getUsedLang, translate } from "../i18n/i18n";
import { disableMenuItems, enableMenuItems } from "../menu/menu";

export default function initIpcListeners(): void {
	// Localization

	ipcMain.on("getLang", (e: IpcMainEvent): void => {
		e.returnValue = getUsedLang();
	});

	ipcMain.on(
		"getTranslation",
		(e: IpcMainEvent, i18nKey: keyof Translations, substitutions: Record<string, string>): void => {
			e.returnValue = translate(i18nKey, substitutions);
		},
	);

	ipcMain.on("getTranslations", (e: IpcMainEvent): void => {
		e.returnValue = getTranslations();
	});

	// Menu items

	ipcMain.on("disableMenuItems", (): void => {
		disableMenuItems();
	});

	ipcMain.on("enableMenuItems", (): void => {
		enableMenuItems();
	});
}
