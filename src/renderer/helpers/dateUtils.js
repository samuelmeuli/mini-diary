import moment from 'moment';

const { app } = window.require('electron').remote;

// Very simplified list of countries where the week starts on Sunday
const COUNTRIES_SUNDAY = ['en-AU', 'en-CA', 'en-US', 'ja'];

const locale = app.getLocale();


/**
 * Get first day of the week according to locale
 */
export function getFirstDayOfWeek() {
	if (COUNTRIES_SUNDAY.includes(locale)) {
		return 0;
	}
	return 1;
}


/**
 * Format Date as diary object index
 */
export function toIndexDate(date) {
	return moment(date).format('YYYY-MM-DD');
}


/**
 * Format Date as a string with weekday
 */
export function toDateString(date) {
	return moment(date).format('dddd, D MMMM YYYY');
}
