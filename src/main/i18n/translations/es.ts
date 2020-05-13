import { Translations } from "../../../shared/types";

const translationsEs: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "Acerca de {appName}",
	"bring-all-to-front": "Traer todo al frente",
	close: "Cerrar",
	copy: "Copiar",
	cut: "Cortar",
	edit: "Edición",
	file: "Archivo",
	help: "Ayuda",
	"hide-app": "Ocultar {appName}",
	"hide-others": "Ocultar otros",
	minimize: "Minimizar",
	paste: "Pegar",
	preferences: "Preferencias",
	"quit-app": "Salir de {appName}",
	redo: "Rehacer",
	"select-all": "Seleccionar todo",
	"show-all": "Mostrar todo",
	speech: "Habla",
	"start-speaking": "Iniciar locución",
	"stop-speaking": "Detener locución",
	undo: "Deshacer",
	view: "Visualización",
	window: "Ventana",
	zoom: "Zoom",

	// Menu (app-specific)
	export: "Exportar",
	"export-to-format": "Exportar a {format}",
	import: "Importar",
	"import-from-format": "Importar desde {format}",
	license: "Licencia",
	"lock-diary": "Bloquear diario",
	"next-day": "Día siguiente",
	"next-month": "Mes siguiente",
	"previous-day": "Día anterior",
	"previous-month": "Mes anterior",
	"privacy-policy": "Política de privacidad",
	website: "Página web",

	// Weekdays
	sunday: "Domingo",
	monday: "Lunes",
	tuesday: "Martes",
	wednesday: "Miércoles",
	thursday: "Jueves",
	friday: "Viernes",
	saturday: "Sábado",

	// Theme
	dark: "Oscuro",
	light: "Claro",
	theme: "Tema",

	// Calendar
	today: "Hoy",

	// Editor
	"add-a-title": "Añade un título",
	bold: "Negrita",
	bullets: "Lista con viñetas",
	italic: "Cursiva",
	list: "Lista numerada",
	"write-something": "Escribe algo",

	// Search
	clear: "Borrar",
	"no-results": "Sin resultados",
	"no-title": "Sin título",
	search: "Buscar",

	// Preferences
	"allow-future-entries": "Permitir la creación de entradas en el futuro",
	auto: "Automático",
	"diary-entries": "Entradas del diario",
	"first-day-of-week": "Primer día de la semana",

	// Password and directory
	"change-directory": "Cambiar carpeta",
	"change-password": "Cambiar contraseña",
	"choose-password": "Por favor, elija una contraseña para su diario",
	"decryption-error": "Error al descifrar el fichero para el diario",
	"diary-file": "Fichero para el diario",
	"file-exists": "Ya existe otro en la carpeta seleccionada",
	"move-error-msg": "Ha ocurrido un error al mover el fichero",
	"move-error-title": "Error al mover fichero",
	"move-file": "Mover fichero",
	"new-password": "Nueva contraseña",
	password: "Clave",
	"passwords-no-match": "Las contraseñas no coinciden",
	"repeat-new-password": "Repite nueva contraseña",
	"repeat-password": "Repite contraseña",
	"select-directory": "Selecciona carpeta",
	"set-password": "Establecer contraseña",
	unlock: "Desbloquear",
	"wrong-password": "Contraseña incorrecta",

	// Import
	"import-error-msg": "Ha ocurrido un error durante la importación",
	"import-error-title": "Error importando",
	"import-instructions-day-one":
		"Abre la aplicación Day One y exporta tu diario en Fichero → Exportar → {format}. Descomprime el fichero guardado. Selecciona el {format} en el siguiente paso para importarlo a {appName}.",
	"import-instructions-jrnl":
		"Para exportar tu diario jrnl, ejecuta {command}. Selecciona el fichero JSON generado en el siguiente paso para importarlo a {appName}.",
	"import-instructions-mini-diary":
		"Puedes importar los datos de una exportación previa desde {appName} en formato JSON o desde otro fichero JSON que tenga el formato adecuado.",
	"start-import": "Iniciar importación",

	// Export
	"export-error-msg": "Ha ocurrido un error durante la exportación",
	"export-error-title": "Error exportando",

	// Other
	loading: "Cargando",
};

export default translationsEs;
