const { Menu } = require('electron');
const is = require('electron-is');

const { getMenuTemplate } = require('./template');

const DISABLED_MENU_ITEMS = [
	'exportToJson',
	'exportToMd',
	'exportToPdf',
	'exportToTxt',
	'importFromDayOne',
	'importFromJrnl',
	'importFromJson',
	'lock',
	'previousDay',
	'nextDay',
	'previousMonth',
	'nextMonth'
];

// Disable preferences in MAS build when the app is locked (no options that can be changed)
if (is.mas()) {
	DISABLED_MENU_ITEMS.push('preferences');
}

// Build menu
const template = getMenuTemplate();
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


exports.disableMenuItems = () => {
	DISABLED_MENU_ITEMS.forEach((id) => {
		menu.getMenuItemById(id).enabled = false;
	});
};


exports.enableMenuItems = () => {
	DISABLED_MENU_ITEMS.forEach((id) => {
		menu.getMenuItemById(id).enabled = true;
	});
};


exports.disableMenuItems();
