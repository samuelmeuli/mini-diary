import { Translations } from "../../../shared/types";

const translationsEl: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "Πληροφορίες για το {appName}",
	"bring-all-to-front": "Επαναφορά όλων στο προσκήνιο",
	close: "Κλείσιμο",
	copy: "Αντιγραφή",
	cut: "Αποκοπή",
	edit: "Επεξεργασία",
	file: "Αρχείο",
	help: "Βοήθεια",
	"hide-app": "Απόκρυψη {appName}",
	"hide-others": "Απόκρυψη υπόλοιπων",
	minimize: "Ελαχιστοποίηση",
	paste: "Επικόλληση",
	preferences: "Προτιμήσεις",
	"quit-app": "Έξοδος {appName}",
	redo: "Επανάληψη",
	"select-all": "Επιλογή Όλων",
	"show-all": "Εμφάνιση Όλων",
	speech: "Ομιλία",
	"start-speaking": "Ξεκινήστε να μιλάτε",
	"stop-speaking": "Σταματήστε να μιλάτε",
	undo: "Αναίρεση",
	view: "Προβολή",
	window: "Παράθυρο",
	zoom: "Μεγένθυση",

	// Menu (app-specific)
	export: "Εξαγωγή",
	"export-to-format": "Εξαγωγή σε {format}",
	import: "Εισαγωγή",
	"import-from-format": "Εισαγωγή από {format}",
	license: "Άδειες",
	"lock-diary": "Κλείδωμα Ημερολογίου",
	"next-day": "Επόμενη Ημέρα",
	"next-month": "Επόμενος Μήνας",
	"previous-day": "Προηγούμενη Ημέρα",
	"previous-month": "Προηγούμενος Μήνας",
	"privacy-policy": "Πολιτική Απορρήτου",
	website: "Ιστοσελίδα",

	// Weekdays
	sunday: "Κυριακή",
	monday: "Δευτέρα",
	tuesday: "Τρίτη",
	wednesday: "Τετάρτη",
	thursday: "Πέμπτη",
	friday: "Παρασκευή",
	saturday: "Σάββατο",

	// Theme
	dark: "Σκοτεινό",
	light: "Φωτεινό",
	theme: "Θέμα",

	// Calendar
	today: "Σήμερα",

	// Editor
	"add-a-title": "Προσθήκη Τίτλου",
	bold: "Έντονα",
	bullets: "Κουκκίδες",
	italic: "Πλάγια",
	list: "Λίστα",
	"write-something": "Γράψτε Κάτι",

	// Search
	clear: "Καθαρισμός",
	"no-results": "Δεν υπάρχουν αποτελέσματα",
	"no-title": "Χωρίς Τίτλο",
	search: "Αναζήτηση",

	// Preferences
	"allow-future-entries": "Να επιτρέπεται η δημιουργία καταχωρήσεων στο μέλλον",
	auto: "Αυτόματο",
	"diary-entries": "Εγγραφές ημερολογίου",
	"first-day-of-week": "πρώτη ημέρα της εβδομάδας",

	// Password and directory
	"change-directory": "Αλλαγή τοποθεσίας",
	"change-password": "Αλλαγή κωδικού",
	"choose-password": "Παρακαλώ επιλέξτε κωδικό για το ημερολόγιο.",
	"decryption-error": "Σφάλμα αποκρυπτογράφησης ημερολογίου",
	"diary-file": "Αρχείο Ημερολογίου",
	"file-exists": "Ένα άλλο αρχείο υπάρχει στη τοποθεσία αυτή",
	"move-error-msg": "Προέξυψε σφάλμα κατά τη μετακίνηση του αρχείου",
	"move-error-title": "Σφάλμα μετακίνησης αρχείου",
	"move-file": "Μετακίνηση αρχείου",
	"new-password": "Νέος κωδικός",
	password: "Κωδικός",
	"passwords-no-match": "Οι κωδικοί δεν ταιριάζουν",
	"repeat-new-password": "Επανάληψη νέου κωδικού",
	"repeat-password": "Επανάληψη κωδικού",
	"select-directory": "Επιλογή τοποθεσίας",
	"set-password": "Επιλογή κωδικού",
	unlock: "Ξεκλείδωμα",
	"wrong-password": "Λάθος κωδικός",

	// Import
	"import-error-msg": "Προέκυψε ένα σφάλμα κατά την εισαγωγή",
	"import-error-title": "Σφάλμα εισαγωγής",
	"import-instructions-day-one":
		"Ανοίξτε την εφαρμογή Day One και εξάγετε το ημερολόγιο σας από το Αρχείο → Εξαγωγή → {format}. Αποσυμπιέστε το αρχείο που θα δημιουργηθεί. Επιλέξτε το αρχείο {format} που δημιουργήθηκε στο επόμενο βήμα για να το εισάγετε στο {appName}.",
	"import-instructions-jrnl":
		"Για να εξάγετε το jrnl ημερολόγιο σας, τρέξτε την εντολή {command}. Επιλέξτε το αρχείο JSON που δημιουργήθηκε στο επόμενο βήμα για να το εισάγετε στο {appName}.",
	"import-instructions-mini-diary":
		"Μπορείτε να εισάγετε τα δεδομένα σας από κάποια παλαιότερη εξαγωγή {appName} JSON ή από ένα άλλη JSON με την ίδια μορφή.",
	"start-import": "Εκκίνηση εισαγωγής",

	// Export
	"export-error-msg": "Προέκυψε ένα σφάλμα κατά την εξαγωγή",
	"export-error-title": "Σφάλμα εξαγωγής",

	// Other
	loading: "Φορτώνει",
};

export default translationsEl;
