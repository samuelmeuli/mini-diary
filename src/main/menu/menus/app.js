const { app } = require('electron');

const preferencesItem = require('../preferencesItem');
const { t } = require('../../i18n/i18n');

const appName = app.getName();

module.exports = {
	label: app.getName(),
	submenu: [
		{
			label: t('about-app', { appName }),
			role: 'about'
		},
		{ type: 'separator' },
		preferencesItem,
		{ type: 'separator' },
		{
			label: t('hide-app', { appName }),
			role: 'hide'
		},
		{
			label: t('hide-others'),
			role: 'hideothers'
		},
		{
			label: t('show-all'),
			role: 'unhide'
		},
		{ type: 'separator' },
		{
			label: t('quit-app', { appName }),
			role: 'quit'
		}
	]
};
