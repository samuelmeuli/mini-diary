import { app } from "electron";

import translationsDe from "./translations/de";
import translationsEl from "./translations/el";
import translationsEn from "./translations/en";
import translationsEs from "./translations/es";
import translationsFr from "./translations/fr";
import translationsIs from "./translations/is";
import translationsPt from "./translations/pt";
import translationsTr from "./translations/tr";
import translationsZh from "./translations/zh";
import { Translations } from "./translations/types";

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
};
const DEFAULT_LANG = "en";

const systemLang = app.getLocale();
let lang: string; // Language used by app (e.g. 'en-US'), used for dates/calendar
let langNoRegion: string; // Language used by app without region string (e.g. 'en'), used for translations
let translations: Translations; // String translations for langNoRegion

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
function setUsedLang(): void {
	const systemLangNoRegion = systemLang.split("-")[0];
	const defaultTranslations = ALL_TRANSLATIONS[DEFAULT_LANG];

	if (systemLangNoRegion in ALL_TRANSLATIONS) {
		// Use system language if translations are available
		lang = systemLang;
		langNoRegion = systemLangNoRegion;
		translations = {
			...defaultTranslations,
			...ALL_TRANSLATIONS[langNoRegion],
		};
	} else {
		// Otherwise, fall back to default language
		lang = DEFAULT_LANG;
		langNoRegion = DEFAULT_LANG;
		translations = defaultTranslations;
	}
}

/**
 * Return translation for string with the provided translation key. Perform string substitutions if
 * required
 */
export function translate(i18nKey: string, substitutions?: Record<string, string>): string {
	if (!(i18nKey in translations)) {
		console.error(`Missing translation of i18nKey "${i18nKey}"`);
		return i18nKey;
	}

	// Return translation if no `substitutions` object is provided
	let translation = translations[i18nKey];
	if (!substitutions) {
		return translation;
	}

	// Perform string substitutions if `substitutions` object is provided
	// Example:
	//   Translation definition: { test: 'Hello {var}' }
	//   Function call: translate('test', { var: 'World' })
	//   Result: 'Hello World'
	Object.entries(substitutions).forEach(([toReplace, replacement]) => {
		translation = translation.replace(`{${toReplace}}`, replacement);
	});
	return translation;
}

/**
 * Return all translations for the detected language
 */
export function getTranslations(): Translations {
	return translations;
}

setUsedLang();
