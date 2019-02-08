const {
	setDaySelectedNext,
	setDaySelectedPrevious,
	setMonthSelectedNext,
	setMonthSelectedPrevious
} = require('../../ipcMain/senders');
const { translate } = require('../../i18n/i18n');

module.exports = {
	label: translate('view'),
	submenu: [
		{
			label: translate('previous-day'),
			id: 'previousDay',
			accelerator: 'Left',
			click() {
				setDaySelectedPrevious();
			}
		},
		{
			label: translate('next-day'),
			id: 'nextDay',
			accelerator: 'Right',
			click() {
				setDaySelectedNext();
			}
		},
		{ type: 'separator' },
		{
			label: translate('previous-month'),
			id: 'previousMonth',
			accelerator: 'CmdOrCtrl+Left',
			click() {
				setMonthSelectedPrevious();
			}
		},
		{
			label: translate('next-month'),
			id: 'nextMonth',
			accelerator: 'CmdOrCtrl+Right',
			click() {
				setMonthSelectedNext();
			}
		}
	]
};
