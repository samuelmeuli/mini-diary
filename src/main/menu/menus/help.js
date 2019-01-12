module.exports = {
	role: 'help',
	submenu: [
		{
			label: 'Learn More',
			click() {
				require('electron').shell.openExternal('https://minidiary.app');
			}
		}
	]
};
