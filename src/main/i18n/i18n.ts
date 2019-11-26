import { app } from "electron";

import { Translations } from "../../shared/types";
import translationsDe from "./translations/de";
import translationsEl from "./translations/el";
import translationsEn from "./translations/en";
import translationsEs from "./translations/es";
import translationsFr from "./translations/fr";
import translationsIs from "./translations/is";
import translationsPt from "./translations/pt";
import translationsTr from "./translations/tr";
import translationsZh from "./translations/zh";
import translationsZhTW from "./translations/zh-TW";

const ALL_TRANSLATIONS: Record<string, Translations> = {
	de: translationsDe,
	el: translationsEl,
	en: translationsEn,
	es: translationsEs,
	fr: translationsFr,
	is: translationsIs,
	pt: translationsPt,
	tr: translationsTr,
	zh: translationsZh,
	"zh-TW": translationsZhTW,
};
let translations: Translations; // String translations for langNoRegion

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

	if (ALL_TRANSLATIONS[lang] !== undefined) {
		// This if-else statement can ensure that if there is any region-specified localizations found, the system will detect and choose the regional localization, instead of the more general one.

		translations = {
			...defaultTranslations,
			...ALL_TRANSLATIONS[systemLang],
		};
	} else if (systemLangNoRegion in ALL_TRANSLATIONS) {
		// Use system language if translations are available
		lang = systemLang;
		langNoRegion = systemLangNoRegion;

		translations = {
			...defaultTranslations,
			...ALL_TRANSLATIONS[langNoRegion],
		};
	} else {
		// Otherwise, fall back to default language
		lang = FALLBACK_LANG;
		langNoRegion = FALLBACK_LANG;
		translations = defaultTranslations;
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
		console.error(`Missing translation of i18nKey "${i18nKey}"`);
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
export function getTranslations(): Translations {
	return translations;
}
