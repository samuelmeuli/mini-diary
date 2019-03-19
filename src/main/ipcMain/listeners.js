const { ipcMain } = require("electron");

const { lang, translate, translations } = require("../i18n/i18n");
const { disableMenuItems, enableMenuItems } = require("../menu/menu");
const { getWindow } = require("../window");

// Localization

ipcMain.on("getLang", e => {
	e.returnValue = lang;
});

ipcMain.on("getTranslation", (e, i18nKey, substitutions) => {
	e.returnValue = translate(i18nKey, substitutions);
});

ipcMain.on("getTranslations", e => {
	e.returnValue = translations;
});

// Menu items

ipcMain.on("disableMenuItems", () => {
	disableMenuItems();
});

ipcMain.on("enableMenuItems", () => {
	enableMenuItems();
});

// Window

ipcMain.on("toggleWindowSize", () => {
	const window = getWindow();
	if (window.isMaximized()) {
		window.unmaximize();
	} else {
		window.maximize();
	}
});
