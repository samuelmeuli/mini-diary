const { shell } = require('electron');

const URL_WEBSITE = 'https://minidiary.app';
const URL_LICENSE = 'https://github.com/samuelmeuli/mini-diary/blob/master/LICENSE.md';
const URL_PRIVACY_POLICY = 'https://github.com/samuelmeuli/mini-diary/blob/master/PRIVACY.md';


module.exports = {
	role: 'help',
	submenu: [
		{
			label: 'Website',
			click() {
				shell.openExternal(URL_WEBSITE);
			}
		},
		{ type: 'separator' },
		{
			label: 'License',
			click() {
				shell.openExternal(URL_LICENSE);
			}
		},
		{
			label: 'Privacy Policy',
			click() {
				shell.openExternal(URL_PRIVACY_POLICY);
			}
		}
	]
};
