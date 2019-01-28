const { shell } = require('electron');

const { t } = require('../../i18n/i18n');

const URL_WEBSITE = 'https://minidiary.app';
const URL_LICENSE = 'https://github.com/samuelmeuli/mini-diary/blob/master/LICENSE.md';
const URL_PRIVACY_POLICY = 'https://github.com/samuelmeuli/mini-diary/blob/master/PRIVACY.md';

module.exports = {
	label: t('help'),
	role: 'help',
	submenu: [
		{
			label: t('website'),
			click() {
				shell.openExternal(URL_WEBSITE);
			}
		},
		{ type: 'separator' },
		{
			label: t('license'),
			click() {
				shell.openExternal(URL_LICENSE);
			}
		},
		{
			label: t('privacy-policy'),
			click() {
				shell.openExternal(URL_PRIVACY_POLICY);
			}
		}
	]
};
