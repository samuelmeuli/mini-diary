const {
	setDaySelectedNext,
	setDaySelectedPrevious,
	setMonthSelectedNext,
	setMonthSelectedPrevious
} = require('../../ipcMain/senders');


module.exports = {
	label: 'View',
	submenu: [
		{
			label: 'Previous day',
			id: 'previousDay',
			accelerator: 'Left',
			click() {
				setDaySelectedPrevious();
			}
		},
		{
			label: 'Next day',
			id: 'nextDay',
			accelerator: 'Right',
			click() {
				setDaySelectedNext();
			}
		},
		{ type: 'separator' },
		{
			label: 'Previous month',
			id: 'previousMonth',
			accelerator: 'CmdOrCtrl+Left',
			click() {
				setMonthSelectedPrevious();
			}
		},
		{
			label: 'Next month',
			id: 'nextMonth',
			accelerator: 'CmdOrCtrl+Right',
			click() {
				setMonthSelectedNext();
			}
		}
	]
};
