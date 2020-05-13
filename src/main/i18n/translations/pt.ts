import { Translations } from "../../../shared/types";

const translationsPt: Partial<Translations> = {
	// Menu (defined by macOS)
	"about-app": "Acerca de {appName}",
	"bring-all-to-front": "Passar tudo para a frente",
	close: "Fechar",
	copy: "Copiar",
	cut: "Cortar",
	edit: "Edição",
	file: "Ficheiro",
	help: "Ajuda",
	"hide-app": "Ocultar {appName}",
	"hide-others": "Ocultar outros aplicações",
	minimize: "Minimizar",
	paste: "Colar",
	preferences: "Preferências",
	"quit-app": "Sair de {appName}",
	redo: "Refazer",
	"select-all": "Selecionar tudo",
	"show-all": "Mostrar tudo",
	speech: "Fala",
	"start-speaking": "Iniciar fala",
	"stop-speaking": "Parar fala",
	undo: "Desfazer",
	view: "Visualização",
	window: "Janela",
	zoom: "Aumentar/reduzir janela",

	// Menu (app-specific)
	export: "Exportar",
	"export-to-format": "Exportar como {format}",
	import: "Importar",
	"import-from-format": "Importar como {format}",
	license: "Licença",
	"lock-diary": "Bloquear diário",
	"next-day": "Dia seguinte",
	"next-month": "Mês seguinte",
	"previous-day": "Dia anterior",
	"previous-month": "Mês anterior",
	"privacy-policy": "Política de privacidade",
	website: "Site",

	// Weekdays
	sunday: "Domingo",
	monday: "Segunda-feira",
	tuesday: "Terça",
	wednesday: "Quarta-feira",
	thursday: "Quinta-feira",
	friday: "Sexta-feira",
	saturday: "Sábado",

	// Theme
	dark: "Escuro",
	light: "Claro",
	theme: "Tema",

	// Calendar
	today: "Hoje",

	// Editor
	"add-a-title": "Adicionar um título",
	bold: "Negrito",
	bullets: "Lista com marcas",
	italic: "Itálico",
	list: "Lista numerada",
	"write-something": "Escreva alguma coisa",

	// Search
	clear: "Limpar",
	"no-results": "Sem resultados",
	"no-title": "Sem titulo",
	search: "Buscar",

	// Preferences
	"allow-future-entries": "Permitir a criação de entradas no futuro",
	auto: "Automático",
	"diary-entries": "Entradas diárias",
	"first-day-of-week": "Primeiro dia da semana",

	// Password and directory
	"change-directory": "Alterar diretório",
	"change-password": "Alterar senha",
	"choose-password": "Por favor, escolha uma senha para o seu diário.",
	"decryption-error": "Erro ao descriptografar arquivo de diário",
	"diary-file": "Arquivo para o diário",
	"file-exists": "O arquivo já existe na pasta de destino",
	"move-error-msg": "Houve um erro para mover o arquivo",
	"move-error-title": "Erro ao mover arquivo",
	"move-file": "Mover arquivo",
	"new-password": "Nova senha",
	password: "Senha",
	"passwords-no-match": "As senhas não coincidem",
	"repeat-new-password": "Repita a nova senha",
	"repeat-password": "Repita a senha",
	"select-directory": "Selecione o diretório",
	"set-password": "Estabelecer senha",
	unlock: "Desbloquear",
	"wrong-password": "Senha incorreta",

	// Import
	"import-error-msg": "Houve um erro durante a importação",
	"import-error-title": "Erro ao importar",
	"import-instructions-day-one":
		"Abra o aplicativo Day One e exporte o seu diário em Arquivo → Exportar → {format}. Descompacte o arquivo gerado. Selecione o arquivo {format} resultante no próximo passo para importá-lo para o {appName}.",
	"import-instructions-jrnl":
		"Para exportar o seu diário jrnl, execute {command}. Selecione o JSON gerado no próximo passo para importá-lo para o {appName}.",
	"import-instructions-mini-diary":
		"Você pode importar os seus dados de outra exportação JSON do {appName} ou de outro arquivo JSON que possua a mesma formatação.",
	"start-import": "Iniciar a importação",

	// Export
	"export-error-msg": "Houve um erro durante a exportação",
	"export-error-title": "Error ao exportar",

	// Other
	loading: "Carregando",
};

export default translationsPt;
