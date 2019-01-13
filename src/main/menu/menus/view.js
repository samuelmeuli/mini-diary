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
			label: 'Previous Day',
			id: 'previousDay',
			accelerator: 'Left',
			click() {
				setDaySelectedPrevious();
			}
		},
		{
			label: 'Next Day',
			id: 'nextDay',
			accelerator: 'Right',
			click() {
				setDaySelectedNext();
			}
		},
		{ type: 'separator' },
		{
			label: 'Previous Month',
			id: 'previousMonth',
			accelerator: 'CmdOrCtrl+Left',
			click() {
				setMonthSelectedPrevious();
			}
		},
		{
			label: 'Next Month',
			id: 'nextMonth',
			accelerator: 'CmdOrCtrl+Right',
			click() {
				setMonthSelectedNext();
			}
		}
	]
};
