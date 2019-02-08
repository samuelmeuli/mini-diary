import moment from 'moment';

import { getLang, getTranslation, getTranslations } from '../electron/ipcRenderer/senders';

export const lang = getLang();
export const translations = getTranslations();

export function initI18n() {
	// Set moment.js language
	moment.locale(lang);
}

export function translate(i18nKey, ...args) {
	return getTranslation(i18nKey, ...args);
}
