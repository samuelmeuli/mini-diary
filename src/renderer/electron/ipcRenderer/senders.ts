import { ipcRenderer } from "electron";

import { Translations } from "../../../shared/types";

// Localization

export function getLang(): string {
	return ipcRenderer.sendSync("getLang");
}

export function getTranslation(
	i18nKey: keyof Translations,
	substitutions: Record<string, string>,
): string {
	return ipcRenderer.sendSync("getTranslation", i18nKey, substitutions);
}

export function getTranslations(): Record<string, string> {
	return ipcRenderer.sendSync("getTranslations");
}

// Menu items

export function disableMenuItems(): void {
	ipcRenderer.send("disableMenuItems");
}

export function enableMenuItems(): void {
	ipcRenderer.send("enableMenuItems");
}
