const { Menu } = require("electron");

const { getMenuTemplate } = require("./template");

const DISABLED_MENU_ITEMS = [
	"exportToJson",
	"exportToMd",
	"exportToPdf",
	"exportToTxt",
	"importFromDayOne",
	"importFromJrnl",
	"importFromJson",
	"lock",
	"previousDay",
	"nextDay",
	"previousMonth",
	"nextMonth",
];

// Build menu
const template = getMenuTemplate();
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function disableMenuItems() {
	DISABLED_MENU_ITEMS.forEach(id => {
		menu.getMenuItemById(id).enabled = false;
	});
}

function enableMenuItems() {
	DISABLED_MENU_ITEMS.forEach(id => {
		menu.getMenuItemById(id).enabled = true;
	});
}

module.exports = {
	disableMenuItems,
	enableMenuItems,
};
