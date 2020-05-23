import { Translations } from "../../../shared/types";

const translationsDe: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "Über {appName}",
	"bring-all-to-front": "Alle nach vorne bringen",
	close: "Schließen",
	copy: "Kopieren",
	cut: "Ausschneiden",
	edit: "Bearbeiten",
	file: "Ablage",
	help: "Hilfe",
	"hide-app": "{appName} ausblenden",
	"hide-others": "Andere ausblenden",
	minimize: "Im Dock ablegen",
	paste: "Einsetzen",
	preferences: "Einstellungen",
	"quit-app": "{appName} beenden",
	redo: "Wiederholen",
	"select-all": "Alle auswählen",
	"show-all": "Alle einblenden",
	speech: "Sprachausgabe",
	"start-speaking": "Sprachausgabe starten",
	"stop-speaking": "Sprachausgabe stoppen",
	undo: "Widerrufen",
	view: "Darstellung",
	window: "Fenster",
	zoom: "Zoomen",

	// Menu (app-specific)
	export: "Exportieren",
	"export-to-format": "Als {format} exportieren",
	"go-to-date": "Zu Datum gehen",
	"go-to-today": "Heute anzeigen",
	import: "Importieren",
	"import-from-format": "Von {format} importieren",
	license: "Lizenz",
	"lock-diary": "Tagebuch sperren",
	"next-day": "Nächster Tag",
	"next-month": "Nächster Monat",
	"previous-day": "Vorheriger Tag",
	"previous-month": "Vorheriger Monat",
	"privacy-policy": "Datenschutzbestimmungen",
	statistics: "Statistiken",
	website: "Website",

	// Weekdays
	sunday: "Sonntag",
	monday: "Montag",
	tuesday: "Dienstag",
	wednesday: "Mittwoch",
	thursday: "Donnerstag",
	friday: "Freitag",
	saturday: "Samstag",

	// Theme
	dark: "Dunkel",
	light: "Hell",
	theme: "Design",

	// Calendar
	today: "Heute",

	// Editor
	"add-a-title": "Titel hinzufügen",
	bold: "Fett",
	bullets: "Aufzählung",
	italic: "Kursiv",
	list: "Nummerierte Liste",
	"write-something": "Schreibe etwas",

	// Search
	clear: "Löschen",
	"no-results": "Keine Resultate",
	"no-title": "Kein Titel",
	search: "Suche",

	// Preferences
	"allow-future-entries": "Einträge in der Zukunft erlauben",
	auto: "Automatisch",
	"diary-entries": "Tagebucheinträge",
	"enable-spellcheck": "Rechtschreibprüfung aktivieren",
	"first-day-of-week": "Erster Wochentag",
	"hide-titles": "Titel ausblenden",
	no: "Nein",
	ok: "OK",
	"reset-diary": "Tagebuch zurücksetzen",
	"reset-diary-confirm": "Ja, ich bin mir sicher",
	"reset-diary-msg":
		"Bist du sicher, dass du dein Tagebuch zurücksetzen möchtest? Diese Aktion wird all deine Einträge unwiderruflich löschen.",

	// Password and directory
	"change-directory": "Ordner ändern",
	"change-password": "Passwort ändern",
	"choose-password": "Bitte wähle ein Passwort für dein Tagebuch.",
	"decryption-error": "Fehler bei Tagebuch-Entschlüsselung",
	"diary-file": "Tagebuch-Datei",
	"file-exists": "Eine andere Datei existiert bereits unter dem gewählten Pfad",
	"move-error-msg": "Beim Verschieben der Datei ist ein Fehler aufgetreten",
	"move-error-title": "Fehler beim Verschieben",
	"move-file": "Datei verschieben",
	"new-password": "Neues Passwort",
	password: "Passwort",
	"passwords-no-match": "Passwörter stimmen nicht überein",
	"repeat-new-password": "Passwort wiederholen",
	"repeat-password": "Passwort wiederholen",
	"select-directory": "Ordner auswählen",
	"set-password": "Passwort setzen",
	unlock: "Entsperren",
	"wrong-password": "Falsches Passwort",

	// Statistics
	"total-entries": "Einträge total",
	"entries-per-week": "Einträge pro Woche",
	"streak-best": "Einträge in Folge (Rekord)",
	"streak-current": "Einträge in Folge (aktuell)",
	"total-words": "Wörter total",
	"words-per-entry": "Wörter pro Eintrag",

	// Import
	"import-error-msg": "Beim Importieren ist ein Fehler aufgetreten",
	"import-error-title": "Fehler beim Importieren",
	"import-instructions-day-one":
		"Öffne das Day-One-App und exportiere dein Tagebuch unter Datei → Export → {format}. Entzippe die erstellte Datei. Im nächsten Schritt, wähle die enthaltene Datei aus, um sie in dein {appName} zu importieren.",
	"import-instructions-jrnl":
		"Um dein jrnl-Tagebuch zu exportieren, führe den folgenden Behfehl aus: {command}. Im nächsten Schritt, wähle die erstellte JSON-Datei aus, um sie in dein {appName} zu importieren.",
	"import-instructions-mini-diary":
		"Du kannst deine Tagebuchdaten von einer mit {appName} exportierten JSON-Datei oder einer anderen, gleich formatierten JSON-Datei importieren.",
	"start-import": "Import starten",

	// Export
	"export-error-msg": "Beim Exportieren ist ein Fehler aufgetreten",
	"export-error-title": "Fehler beim Exportieren",

	// Other
	loading: "Wird geladen",
};

export default translationsDe;
