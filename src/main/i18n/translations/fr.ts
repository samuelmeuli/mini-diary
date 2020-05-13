import { Translations } from "../../../shared/types";

const translationsFr: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "À propos de {appName}",
	"bring-all-to-front": "Tout ramener au premier plan",
	close: "Fermer",
	copy: "Copier",
	cut: "Couper",
	edit: "Édition",
	file: "Fichier",
	help: "Aide",
	"hide-app": "Masquer {appName}",
	"hide-others": "Masquer les autres",
	minimize: "Placer dans le Dock",
	paste: "Coller",
	preferences: "Préférences",
	"quit-app": "Quitter {appName}",
	redo: "Rétablir",
	"select-all": "Tout sélectionner",
	"show-all": "Tout afficher",
	speech: "Parole",
	"start-speaking": "Commencer la lecture",
	"stop-speaking": "Arrêter la lecture",
	undo: "Annuler",
	view: "Présentation",
	window: "Fenêtre",
	zoom: "Réduire/agrandir",

	// Menu (app-specific)
	export: "Exporter",
	"export-to-format": "Exporter au format {format}",
	import: "Importer",
	"import-from-format": "Importer au format {format}",
	license: "Licence",
	"lock-diary": "Verrouiller le journal",
	"next-day": "Jour suivant",
	"next-month": "Mois suivant",
	"previous-day": "Jour précédent",
	"previous-month": "Mois précédent",
	"privacy-policy": "Politique de confidentialité",
	website: "Site web",

	// Weekdays
	sunday: "Dimanche",
	monday: "Lundi",
	tuesday: "Mardi",
	wednesday: "Mercredi",
	thursday: "Jeudi",
	friday: "Vendredi",
	saturday: "Samedi",

	// Theme
	dark: "Sombre",
	light: "Clair",
	theme: "Thème",

	// Calendar
	today: "Aujourd'hui",

	// Editor
	"add-a-title": "Ajoutez un titre",
	bold: "Gras",
	bullets: "Liste à puces",
	italic: "Italique",
	list: "Liste numérotée",
	"write-something": "Écrivez ce qui vous passe par la tête",

	// Search
	clear: "Effacer",
	"no-results": "Aucun résultat",
	"no-title": "Sans titre",
	search: "Rechercher",

	// Preferences
	"allow-future-entries": "Autoriser la création d'entrées à l'avenir",
	auto: "Automatique",
	"diary-entries": "Entrées de journal",
	"first-day-of-week": "Premier jour de la semaine",

	// Password and directory
	"change-directory": "Changer de répertoire",
	"change-password": "Changer de mot de passe",
	"choose-password": "Veuillez choisir un mot de passe pour votre journal.",
	"decryption-error": "Erreur de déchiffrage",
	"diary-file": "Fichier journal",
	"file-exists": "Un autre fichier existe déjà dans ce répertoire",
	"move-error-msg": "Une erreur s'est produite lors du déplacement du fichier",
	"move-error-title": "Déplacement impossible",
	"move-file": "Déplacer le fichier",
	"new-password": "Nouveau mot de passe",
	password: "Mot de passe",
	"passwords-no-match": "Les mots de passe ne correspondent pas",
	"repeat-new-password": "Ressaissez votre nouveau mot de passe",
	"repeat-password": "Ressaissez votre mot de passe",
	"select-directory": "Choisir un répertoire",
	"set-password": "Choisissez un mot de passe",
	unlock: "Déverrouiller",
	"wrong-password": "Mot de passe invalide",

	// Import
	"import-error-msg": "Une erreur s'est produite lors de l'importation",
	"import-error-title": "Erreur d'importation",
	"import-instructions-day-one":
		"Ouvrez l'application Day One et exportez votre journal depuis le menu Fichier → Exporter → {format}. Ouvrez le fichier au format ZIP. Sélectionnez le fichier {format} demandé lors de l'importation via {appName}.",
	"import-instructions-jrnl":
		"Exportez votre journal au format jrnl via la commande {command}. Sélectionnez le fichier JSON créé pour l'importer à {appName}.",
	"import-instructions-mini-diary":
		"Vous pouvez importer vos données à partir d'un ancien fichier JSON de {appName} exporté ou à partir d'un autre fichier JSON formatté de la même façon.",
	"start-import": "Commencer l'importation",

	// Export
	"export-error-msg": "Une erreur s'est produite lors de l'exportation",
	"export-error-title": "Erreur d'exportation",

	// Other
	loading: "Chargement en cours",
};

export default translationsFr;
