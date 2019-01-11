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
 * Format date as a string compatible with the import tool of Day One
 */
export function toDayOneDate(date) {
	return moment(date).format('DD MMMM YYYY [at 00:00:00 GMT]');
}


/**
 * Format date as diary object index
 */
export function toIndexDate(date) {
	return moment(date).format('YYYY-MM-DD');
}


/**
 * Format date as a string with weekday
 */
export function toDateString(date) {
	return moment(date).format('dddd, D MMMM YYYY');
}
