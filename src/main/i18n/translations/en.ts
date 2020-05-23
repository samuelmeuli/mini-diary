import { Translations } from "../../../shared/types";

const translationsEn: Translations = {
	// Menu (defined by macOS)
	"about-app": "About {appName}",
	"bring-all-to-front": "Bring All to Front",
	close: "Close",
	copy: "Copy",
	cut: "Cut",
	edit: "Edit",
	file: "File",
	help: "Help",
	"hide-app": "Hide {appName}",
	"hide-others": "Hide Others",
	minimize: "Minimize",
	paste: "Paste",
	preferences: "Preferences",
	"quit-app": "Quit {appName}",
	redo: "Redo",
	"select-all": "Select All",
	"show-all": "Show All",
	speech: "Speech",
	"start-speaking": "Start Speaking",
	"stop-speaking": "Stop Speaking",
	undo: "Undo",
	view: "View",
	window: "Window",
	zoom: "Zoom",

	// Menu (app-specific)
	export: "Export",
	"export-to-format": "Export to {format}",
	"go-to-date": "Go to Date",
	"go-to-today": "Go to Today",
	import: "Import",
	"import-from-format": "Import from {format}",
	license: "License",
	"lock-diary": "Lock Diary",
	"next-day": "Next Day",
	"next-month": "Next Month",
	"previous-day": "Previous Day",
	"previous-month": "Previous Month",
	"privacy-policy": "Privacy Policy",
	statistics: "Statistics",
	website: "Website",

	// Weekdays
	sunday: "Sunday",
	monday: "Monday",
	tuesday: "Tuesday",
	wednesday: "Wednesday",
	thursday: "Thursday",
	friday: "Friday",
	saturday: "Saturday",

	// Theme
	dark: "Dark",
	light: "Light",
	theme: "Theme",

	// Calendar
	today: "Today",

	// Editor
	"add-a-title": "Add a title",
	bold: "Bold",
	bullets: "Bullets",
	italic: "Italic",
	list: "List",
	"write-something": "Write something",

	// Search
	clear: "Clear",
	"no-results": "No results",
	"no-title": "No title",
	search: "Search",

	// Preferences
	"allow-future-entries": "Allow entries in the future",
	auto: "Auto",
	"diary-entries": "Diary entries",
	"enable-spellcheck": "Check spelling",
	"first-day-of-week": "First day of the week",
	"hide-titles": "Hide titles",
	no: "No",
	ok: "OK",
	"reset-diary": "Reset diary",
	"reset-diary-confirm": "Yes, I am sure",
	"reset-diary-msg":
		"Are you sure you want to reset your diary? This will delete all of your content. The data cannot be restored.",

	// Password and directory
	"change-directory": "Change directory",
	"change-password": "Change password",
	"choose-password": "Please choose a password for your diary.",
	"decryption-error": "Error decrypting diary file",
	"diary-file": "Diary file",
	"file-exists": "Another file exists at the destination path",
	"move-error-msg": "An error occurred when moving the file",
	"move-error-title": "Move error",
	"move-file": "Move file",
	"new-password": "New password",
	password: "Password",
	"passwords-no-match": "Passwords do not match",
	"repeat-new-password": "Repeat new password",
	"repeat-password": "Repeat password",
	"select-directory": "Select directory",
	"set-password": "Set password",
	unlock: "Unlock",
	"wrong-password": "Wrong password",

	// Statistics
	"total-entries": "total entries",
	"entries-per-week": "entries per week",
	"streak-best": "entries in a row (record streak)",
	"streak-current": "entries in a row (current streak)",
	"total-words": "total words",
	"words-per-entry": "words per entry",

	// Import
	"import-error-msg": "An error occurred during the import",
	"import-error-title": "Import error",
	"import-instructions-day-one":
		"Open the Day One app and export your diary under File → Export → {format}. Unzip the created file. Select the resulting {format} file in the next step to import it into {appName}.",
	"import-instructions-jrnl":
		"To export your jrnl diary, run {command}. Select the created JSON file in the next step to import it into {appName}.",
	"import-instructions-mini-diary":
		"You can import your data from a previous {appName} JSON export or from another JSON file that is formatted the same way.",
	"start-import": "Start import",

	// Export
	"export-error-msg": "An error occurred during the export",
	"export-error-title": "Export error",

	// Other
	loading: "Loading",
};

export default translationsEn;
