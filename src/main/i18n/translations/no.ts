import { Translations } from "../../../shared/types";

const translationsNo: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "Om {appName}",
	"bring-all-to-front": "Vis Alle Foran",
	close: "Lukk",
	copy: "Kopier",
	cut: "Klipp",
	edit: "Endre",
	file: "Fil",
	help: "Hjelp",
	"hide-app": "Skjul {appName}",
	"hide-others": "Skjul Andre",
	minimize: "Minimer",
	paste: "Lim inn",
	preferences: "Preferanser",
	"quit-app": "Avslutt {appName}",
	redo: "Omgjør",
	"select-all": "Velg Alle",
	"show-all": "Vis Alle",
	speech: "Tale",
	"start-speaking": "Start å Tale",
	"stop-speaking": "Stopp å Tale",
	undo: "Angre",
	view: "Visning",
	window: "Vindu",
	zoom: "Zoom",

	// Menu (app-specific)
	export: "Eksporter",
	"export-to-format": "Eksporter til {format}",
	"go-to-date": "Gå til Dato",
	"go-to-today": "Gå til I Dag",
	import: "Importer",
	"import-from-format": "Importer fra {format}",
	license: "Lisens",
	"lock-diary": "Lås Dagbok",
	"next-day": "Neste Dag",
	"next-month": "Neste Måned",
	"previous-day": "Forrige Dag",
	"previous-month": "Forrige Måned",
	"privacy-policy": "Personvern-erklæring",
	statistics: "Statistikk",
	website: "Nettside",

	// Weekdays
	sunday: "Søndag",
	monday: "Mandag",
	tuesday: "Tirsdag",
	wednesday: "Onsdag",
	thursday: "Torsdag",
	friday: "Fredag",
	saturday: "Lørdag",

	// Theme
	dark: "Mørk",
	light: "Lys",
	theme: "Tema",

	// Calendar
	today: "I Dag",

	// Editor
	"add-a-title": "Legg til tittel",
	bold: "Fet",
	bullets: "Punkt",
	italic: "Kursiv",
	list: "Liste",
	"write-something": "Skriv noe",

	// Search
	clear: "Tøm",
	"no-results": "Ingen resultater",
	"no-title": "Ingen tittel",
	search: "Søk",

	// Preferences
	"allow-future-entries": "Tillat innlegg i fremtiden",
	auto: "Auto",
	"diary-entries": "Dagbok innlegg",
	"first-day-of-week": "Første dag i uken",
	no: "Nei",
	ok: "OK",
	"reset-diary": "Nullstill dagbok",
	"reset-diary-confirm": "Ja, jeg er sikker",
	"reset-diary-msg":
		"Er du sikker på at du vil nullstille dagboken din? Dette vil slette alt innhold. Innholdet kan ikke gjenopprettes.",

	// Password and directory
	"change-directory": "Endre mappe",
	"change-password": "Endre passord",
	"choose-password": "Vennligst oppgi et passord for din dagbok.",
	"decryption-error": "Feil ved dekryptering av dagbokfil",
	"diary-file": "Dagbokfil",
	"file-exists": "En annen fil finnes i målstien",
	"move-error-msg": "En feil oppstod ved flytting av filen",
	"move-error-title": "Flyttefeil",
	"move-file": "Flytt fil",
	"new-password": "Nytt passord",
	password: "Passord",
	"passwords-no-match": "Passords stemmer ikke overens",
	"repeat-new-password": "Gjenta nytt passord",
	"repeat-password": "Gjenta passord",
	"select-directory": "Velg mappe",
	"set-password": "Sett passord",
	unlock: "Lås opp",
	"wrong-password": "Feil passord",

	// Statistics
	"total-entries": "antall innlegg",
	"entries-per-week": "innlegg per uke",
	"streak-best": "innlegg på rad (ubrutt rekord)",
	"streak-current": "innlegg på rad (nåværende rekord)",
	"total-words": "totalt antall ord",
	"words-per-entry": "ord per innlegg",

	// Import
	"import-error-msg": "En feil oppstod under importering",
	"import-error-title": "Importfeil",
	"import-instructions-day-one":
		"Åpne Day One appen og eksporter dagbokfilen under Fil → Eksorter → {format}. Unzip den lagde filen. Velg resulterende {format} fil i det neste steget for å importere den inn i {appName}.",
	"import-instructions-jrnl":
		"For å eksportere din jrnl dagbok, kjør {command}. Velg den opprettede JSON filen i neste steg for å importere den inn i {appName}.",
	"import-instructions-mini-diary":
		"Du kan importere innhold fra en tidligere {appName} JSON eksport eller fra en annen JSON fil som er satt opp på samme måte.",
	"start-import": "Start import",

	// Export
	"export-error-msg": "En feil skjedde under eksportering",
	"export-error-title": "Eksportfeil",

	// Other
	loading: "Laster",
};

export default translationsNo;
