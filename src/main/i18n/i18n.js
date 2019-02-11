const { app } = require('electron');

const translationsDe = require('./translations/de');
const translationsEn = require('./translations/en');
const translationsEs = require('./translations/es');
const translationsFr = require('./translations/fr');
const translationsPt = require('./translations/pt');
const translationsTr = require('./translations/tr');

const ALL_TRANSLATIONS = {
	de: translationsDe,
	en: translationsEn,
	es: translationsEs,
	fr: translationsFr,
	pt: translationsPt,
	tr: translationsTr
};
const DEFAULT_LANG = 'en';

const systemLang = app.getLocale();
let lang; // Language used by app (e.g. 'en-US'), used for dates/calendar
let langNoRegion; // Language used by app without region string (e.g. 'en'), used for translations
let translations; // String translations for langNoRegion

/**
 * Determine language to use for the app (use system language if translations are available,
 * otherwise fall back to default language
 */
function setUsedLang() {
	const systemLangNoRegion = systemLang.split('-')[0];
	const defaultTranslations = ALL_TRANSLATIONS[DEFAULT_LANG];

	if (systemLangNoRegion in ALL_TRANSLATIONS) {
		// Use system language if translations are available
		lang = systemLang;
		langNoRegion = systemLangNoRegion;
		translations = {
			...defaultTranslations,
			...ALL_TRANSLATIONS[langNoRegion]
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
function translate(i18nKey, substitutions) {
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

setUsedLang();

module.exports = {
	lang,
	translate,
	translations
};
