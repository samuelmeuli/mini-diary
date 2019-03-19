import moment from "moment";

import { getLang, getTranslation, getTranslations } from "../electron/ipcRenderer/senders";

export const lang = getLang();
export const translations = getTranslations();

export function initI18n(): void {
	// Set moment.js language
	moment.locale(lang);
}

export function translate(i18nKey: string, substitutions: Record<string, string>): string {
	return getTranslation(i18nKey, substitutions);
}
