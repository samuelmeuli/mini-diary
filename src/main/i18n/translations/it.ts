import { Translations } from "../../../shared/types";

const translationsIt: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "Informazioni su {appName}",
	"bring-all-to-front": "Porta tutto in primo piano",
	close: "Chiudi",
	copy: "Copia",
	cut: "Taglia",
	edit: "Modifica",
	file: "File",
	help: "Aiuto",
	"hide-app": "Nascondi {appName}",
	"hide-others": "Nascondi altri",
	minimize: "Contrai",
	paste: "Incolla",
	preferences: "Preferenze",
	"quit-app": "Esci da {appName}",
	redo: "Ripristina originale",
	"select-all": "Seleziona tutto",
	"show-all": "Mostra tutto",
	speech: "Voce",
	"start-speaking": "Avvia riproduzione vocale",
	"stop-speaking": "Interrompi riproduzione",
	undo: "Annulla",
	view: "Vista",
	window: "Finestra",
	zoom: "Ridimensiona",

	// Menu (app-specific)
	export: "Esporta",
	"export-to-format": "Esporta come {format}",
	"go-to-date": "Vai al giorno",
	"go-to-today": "Vai a oggi",
	import: "Importa",
	"import-from-format": "Importa da {format}",
	license: "Licenza",
	"lock-diary": "Blocca diario",
	"next-day": "Giorno successivo",
	"next-month": "Mese successivo",
	"previous-day": "Giorno precedente",
	"previous-month": "Mese precedente",
	"privacy-policy": "Informativa sulla privacy",
	statistics: "Statistiche",
	website: "Sito Web",

	// Weekdays
	sunday: "Domenica",
	monday: "Lunedì",
	tuesday: "Martedì",
	wednesday: "Mercoledì",
	thursday: "Giovedì",
	friday: "Venerdì",
	saturday: "Sabato",

	// Theme
	dark: "Scuro",
	light: "Chiaro",
	theme: "Tema",

	// Calendar
	today: "Oggi",

	// Editor
	"add-a-title": "Aggiungi un titolo",
	bold: "Grassetto",
	bullets: "Elenco puntato",
	italic: "Corsivo",
	list: "Elenco numerato",
	"write-something": "Scrivi qualcosa",

	// Search
	clear: "Cancella ricerca",
	"no-results": "Nessun risultato",
	"no-title": "Nessun titolo",
	search: "Cerca",

	// Preferences
	"allow-future-entries": "Consenti l'inserimento di note nel futuro",
	auto: "Auto",
	"diary-entries": "Note",
	"first-day-of-week": "Primo giorno della settimana",
	no: "No",
	ok: "OK",
	"reset-diary": "Reset diario",
	"reset-diary-confirm": "Si, sono sicuro",
	"reset-diary-msg":
		"Sei sicuro di voler eseguire il reset del diario? Questa operazione eliminerà tutti i tuoi contenuti. I dati non potranno essere recuperati.",

	// Password and directory
	"change-directory": "Cambia cartella",
	"change-password": "Cambia password",
	"choose-password": "Scegli una password per il tuo diario.",
	"decryption-error": "Errore nel decriptare il file del diario",
	"diary-file": "File",
	"file-exists": "Un altro file è presente nel percorso di destinazione",
	"move-error-msg": "Si è verificato un errore nello spostamento del file",
	"move-error-title": "Errore di spostamento",
	"move-file": "Sposta file",
	"new-password": "Nuova password",
	password: "Password",
	"passwords-no-match": "Le password non corrispondono",
	"repeat-new-password": "Reinserisci la nuova password",
	"repeat-password": "Reinserisci password",
	"select-directory": "Seleziona cartella",
	"set-password": "Imposta password",
	unlock: "Sblocca",
	"wrong-password": "Password sbagliata",

	// Statistics
	"total-entries": "Totale note inserite ",
	"entries-per-week": "Note per settimana",
	"streak-best": "N. di note consecutive (serie record)",
	"streak-current": "N. di note consecutive (ultima serie)",
	"total-words": "Totale parole",
	"words-per-entry": "Parole per nota",

	// Import
	"import-error-msg": "Si è verificato un errore durante l'import",
	"import-error-title": "Errore di import",
	"import-instructions-day-one":
		"Apri l'app Day One ed esporta il tuo diario cliccando su File → Export → {format}. Decomprimi il file generato. Al passo successivo seleziona il file {format} ottenuto per importarlo in {appName}.",
	"import-instructions-jrnl":
		"Per esportare il tuo diario jrnl, lancia il comando {command}. Al passo successivo seleziona il file JSON ottenuto per importarlo in {appName}.",
	"import-instructions-mini-diary":
		"Puoi importare i tuoi dati da un {appName} JSON precedentemente esportato o da un altro file JSON formattato allo stesso modo.",
	"start-import": "Inizia l'import",

	// Export
	"export-error-msg": "Si è verificato un errore durante l'export",
	"export-error-title": "Errore di export",

	// Other
	loading: "Caricamento in corso",
};

export default translationsIt;
