import { Translations } from "../../../shared/types";

const translationsIs: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "Um {appName}",
	"bring-all-to-front": "Færa allt í forgrunn",
	close: "Loka",
	copy: "Afrita",
	cut: "Klippa",
	edit: "Breyta",
	file: "Skrá",
	help: "Hjálp",
	"hide-app": "Fela {appName}",
	"hide-others": "Fela annað",
	minimize: "Fela",
	paste: "Líma",
	preferences: "Stillingar",
	"quit-app": "Loka {appName}",
	redo: "Endurtaka",
	"select-all": "Velja allt",
	"show-all": "Sýna allt",
	speech: "Tal",
	"start-speaking": "Byrja að tala",
	"stop-speaking": "Hætta að tala",
	undo: "Afturkalla",
	view: "Sjá",
	window: "Gluggi",
	zoom: "Aðdráttur",

	// Menu (app-specific)
	export: "Flytja út",
	"export-to-format": "Flytja út í {format}",
	import: "Flytja inn",
	"import-from-format": "Flytja inn úr {format}",
	license: "Leyfi",
	"lock-diary": "Læsa dagbók",
	"next-day": "Næsti dagur",
	"next-month": "Næsti mánuður",
	"previous-day": "Fyrri dagur",
	"previous-month": "Fyrri mánuður",
	"privacy-policy": "Friðhelgistefna",
	website: "Vefsíða",

	// Weekdays
	sunday: "Sunnudag",
	monday: "Mánudagur",
	tuesday: "Þriðjudag",
	wednesday: "Miðvikudag",
	thursday: "Fimmtudag",
	friday: "Föstudag",
	saturday: "Laugardag",

	// Theme
	dark: "Dökkt",
	light: "Ljóst",
	theme: "Þema",

	// Calendar
	today: "Í dag",

	// Editor
	"add-a-title": "Bæta við titli",
	bold: "Djarfur",
	bullets: "Bullet listi",
	italic: "Skáletrað",
	list: "Númeraður listi",
	"write-something": "Skrifaðu eitthvað",

	// Search
	clear: "Hreinsa",
	"no-results": "Engar niðurstöður",
	"no-title": "Án titils",
	search: "Leita",

	// Preferences
	"allow-future-entries": "Leyfa að búa til færslur í framtíðinni",
	auto: "Sjálfgefið",
	"diary-entries": "Dagbókarfærslur",
	"first-day-of-week": "Fyrsta dag vikunnar",

	// Password and directory
	"change-directory": "Breyta möppu",
	"change-password": "Breyta lykilorði",
	"choose-password": "Vinsamlegast veldu lykilorð fyrir dagbókina þína.",
	"decryption-error": "Villa við dulkóðun dagbókarskrár",
	"diary-file": "Dagbókarskrá",
	"file-exists": "Önnur skrá er til á valdri slóð",
	"move-error-msg": "Villa við færslu skrárinnar",
	"move-error-title": "Færsluvilla",
	"move-file": "Færa skrá",
	"new-password": "Nýtt lykilorð",
	password: "Lykilorð",
	"passwords-no-match": "Lykilorð stemma ekki",
	"repeat-new-password": "Endurtaka nýtt lykilorð",
	"repeat-password": "Endurtaka lykilorð",
	"select-directory": "Velja möppu",
	"set-password": "Læsa með lykilorði",
	unlock: "Aflæsa",
	"wrong-password": "Rangt lykilorð",

	// Import
	"import-error-msg": "Villa varð við innflutninginn",
	"import-error-title": "Innfærsluvilla",
	"import-instructions-day-one":
		"Opnaðu Day One forritið og fluttu út dagbókina þúna undir File → Export → {format}. Afþjappaðu skrána sem varð til. Veldu {format} skrána í næsta skrefi til að færa hana inn í {appName}.",
	"import-instructions-jrnl":
		"Til að flytja út jrnl dagbókina, keyrðu {command}. Veldu JSON skrána sem varð til í næsta skrefi til að færa hana inn í {appName}.",
	"import-instructions-mini-diary":
		"Þú getur flutt inn gögn úr fyrri {appName} JSON útflutningi eða úr annarri JSON skrá með sama sniði.",
	"start-import": "Hefja innflutning",

	// Export
	"export-error-msg": "Villa varð við útflutninginn",
	"export-error-title": "Útflutningsvilla",

	// Other
	loading: "Hleð",
};

export default translationsIs;
