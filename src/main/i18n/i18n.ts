import { app } from "electron";

import logger from "electron-log";

import { Translations } from "../../shared/types";
import translationsDe from "./translations/de";
import translationsEl from "./translations/el";
import translationsEn from "./translations/en";
import translationsEs from "./translations/es";
import translationsFr from "./translations/fr";
import translationsIs from "./translations/is";
import translationsIt from "./translations/it";
import translationsNo from "./translations/no";
import translationsPt from "./translations/pt";
import translationsTr from "./translations/tr";
import translationsUk from "./translations/uk";
import translationsZh from "./translations/zh";
import translationsZhTw from "./translations/zhTw";

const ALL_TRANSLATIONS: Record<string, Partial<Translations>> = {
	de: translationsDe,
	el: translationsEl,
	en: translationsEn,
	es: translationsEs,
	fr: translationsFr,
	is: translationsIs,
	it: translationsIt,
	nb: translationsNo,
	no: translationsNo,
	pt: translationsPt,
	tr: translationsTr,
	uk: translationsUk,
	zh: translationsZh,
	"zh-TW": translationsZhTw,
};
let translations: Partial<Translations>; // String translations for langNoRegion

const FALLBACK_LANG = "en";
let systemLang;
let lang: string; // Language used by app (e.g. 'en-US'), used for dates/calendar
let langNoRegion: string; // Language used by app without region string (e.g. 'en'), used for translations

/**
 * Return language to use for the app
 */
export function getUsedLang(): string {
	return lang;
}

/**
 * Determine language to use for the app (use system language if translations are available,
 * otherwise fall back to default language
 */
export function initI18n(): void {
	systemLang = app.getLocale();
	const systemLangNoRegion = systemLang.split("-")[0];
	const defaultTranslations = ALL_TRANSLATIONS[FALLBACK_LANG];
	logger.log(`System language is "${systemLang}" ("${systemLangNoRegion}" without region)`);

	if (systemLang in ALL_TRANSLATIONS) {
		// This if-else statement can ensure that if there is any region-specified localizations found,
		// the system will detect and choose the regional localization, instead of the more general one
		lang = systemLang;
		translations = {
			...defaultTranslations,
			...ALL_TRANSLATIONS[lang],
		};
		logger.log(`Using "${lang}" locale and translations`);
	} else if (systemLangNoRegion in ALL_TRANSLATIONS) {
		// Use system language if translations are available
		lang = systemLang;
		langNoRegion = systemLangNoRegion;
		translations = {
			...defaultTranslations,
			...ALL_TRANSLATIONS[langNoRegion],
		};
		logger.log(`Using "${lang}" locale and "${langNoRegion}" translations`);
	} else {
		// Otherwise, fall back to default language
		lang = FALLBACK_LANG;
		langNoRegion = FALLBACK_LANG;
		translations = defaultTranslations;
		logger.log(`Using default locale and translations ("${FALLBACK_LANG}")`);
	}
}

/**
 * Return translation for string with the provided translation key. Perform string substitutions if
 * required
 */
export function translate(
	i18nKey: keyof Translations,
	substitutions?: Record<string, string>,
): string {
	let translation = translations[i18nKey];

	// Log error and return `i18nKey` if translation string is missing both in current and fallback
	// language
	if (!translation) {
		logger.error(`Missing translation of i18nKey "${i18nKey}"`);
		return i18nKey;
	}

	// Return translation if no `substitutions` object is provided
	if (!substitutions) {
		return translation;
	}

	// Perform string substitutions if `substitutions` object is provided
	// Example:
	//   Translation definition: { test: 'Hello {var}' }
	//   Function call: translate('test', { var: 'World' })
	//   Result: 'Hello World'
	Object.entries(substitutions).forEach(([toReplace, replacement]): void => {
		translation = (translation as string).replace(new RegExp(`{${toReplace}}`, "g"), replacement);
	});
	return translation;
}

/**
 * Return all translations for the detected language
 */
export function getTranslations(): Partial<Translations> {
	return translations;
}
