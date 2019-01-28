const {
	setDaySelectedNext,
	setDaySelectedPrevious,
	setMonthSelectedNext,
	setMonthSelectedPrevious
} = require('../../ipcMain/senders');
const { t } = require('../../i18n/i18n');

module.exports = {
	label: t('view'),
	submenu: [
		{
			label: t('previous-day'),
			id: 'previousDay',
			accelerator: 'Left',
			click() {
				setDaySelectedPrevious();
			}
		},
		{
			label: t('next-day'),
			id: 'nextDay',
			accelerator: 'Right',
			click() {
				setDaySelectedNext();
			}
		},
		{ type: 'separator' },
		{
			label: t('previous-month'),
			id: 'previousMonth',
			accelerator: 'CmdOrCtrl+Left',
			click() {
				setMonthSelectedPrevious();
			}
		},
		{
			label: t('next-month'),
			id: 'nextMonth',
			accelerator: 'CmdOrCtrl+Right',
			click() {
				setMonthSelectedNext();
			}
		}
	]
};
