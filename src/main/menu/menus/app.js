const { app } = require('electron');

const preferencesItem = require('../preferencesItem');


module.exports = {
	label: app.getName(),
	submenu: [
		{ role: 'about' },
		{ type: 'separator' },
		preferencesItem,
		{ type: 'separator' },
		{ role: 'hide' },
		{ role: 'hideothers' },
		{ role: 'unhide' },
		{ type: 'separator' },
		{ role: 'quit' }
	]
};
