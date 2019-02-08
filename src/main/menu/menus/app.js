const { app } = require('electron');

const preferencesItem = require('../preferencesItem');
const { translate } = require('../../i18n/i18n');

const appName = app.getName();

module.exports = {
	label: app.getName(),
	submenu: [
		{
			label: translate('about-app', { appName }),
			role: 'about'
		},
		{ type: 'separator' },
		preferencesItem,
		{ type: 'separator' },
		{
			label: translate('hide-app', { appName }),
			role: 'hide'
		},
		{
			label: translate('hide-others'),
			role: 'hideothers'
		},
		{
			label: translate('show-all'),
			role: 'unhide'
		},
		{ type: 'separator' },
		{
			label: translate('quit-app', { appName }),
			role: 'quit'
		}
	]
};
