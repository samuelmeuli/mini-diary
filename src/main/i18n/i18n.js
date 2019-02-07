const { app } = require('electron');

const translationsDe = require('./translations/de');
const translationsEn = require('./translations/en');
const translationsEs = require('./translations/es');
const translationsFr = require('./translations/fr');
const translationsPt = require('./translations/pt');
const translationsTr = require('./translations/tr');

const DEFAULT_LANG = 'en';
const TRANSLATIONS = {
	de: translationsDe,
	en: translationsEn,
	es: translationsEs,
	fr: translationsFr,
	pr: translationsPt,
	tr: translationsTr
};

const systemLang = app.getLocale();

let lang; // Language used by app (e.g. 'en-US'), used for dates/calendar
let langNoRegion; // Language used by app without region string (e.g. 'en'), used for translations
let langTranslations; // String translations for langNoRegion

/**
 * Determine language to use for the app (use system language if translations are available,
 * otherwise fall back to default language
 */
function setUsedLang() {
	const systemLangNoRegion = systemLang.split('-')[0];

	if (systemLangNoRegion in TRANSLATIONS) {
		// Use system language if translations are available
		lang = systemLang;
		langNoRegion = systemLangNoRegion;
	} else {
		// Otherwise, fall back to default language
		lang = DEFAULT_LANG;
		langNoRegion = DEFAULT_LANG;
	}
	// Load translations
	langTranslations = TRANSLATIONS[langNoRegion];
}

/**
 * Return translation for string with the provided translation key. Perform string substitutions if
 * required
 */
function t(i18nKey, substitutions) {
	let translation;
	if (!(i18nKey in langTranslations)) {
		console.error(`Missing translation of i18nKey "${i18nKey}" for language "${langNoRegion}"`);
		translation = TRANSLATIONS[DEFAULT_LANG][i18nKey];
	} else {
		translation = langTranslations[i18nKey];
	}

	if (!substitutions) {
		return translation;
	}

	// Perform string substitutions if `substitutions` object is provided
	// Example:
	//   Translation definition: { 'test': 'Hello [var]' }
	//   Function call: t('test', { var: 'World' })
	//   Result: 'Hello World'
	Object.entries(substitutions).forEach(([toReplace, replacement]) => {
		translation = translation.replace(`{${toReplace}}`, replacement);
	});
	return translation;
}

setUsedLang();
module.exports.t = t;
module.exports.getLang = () => lang;
