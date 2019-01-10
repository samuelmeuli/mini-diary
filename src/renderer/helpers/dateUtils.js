import moment from 'moment';

const { app } = window.require('electron').remote;

// Very simplified list of countries where the week starts on Sunday
const COUNTRIES_SUNDAY = ['en-AU', 'en-CA', 'en-US', 'ja'];

const locale = app.getLocale();


/**
 * Format Date as diary object index (YYYY-MM-DD)
 */
export function formatDate(date) {
	return moment(date).format('YYYY-MM-DD');
}


/**
 * Get first day of the week according to locale
 */
export function getFirstDayOfWeek() {
	if (COUNTRIES_SUNDAY.includes(locale)) {
		return 0;
	}
	return 1;
}
