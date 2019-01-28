import moment from 'moment';

/**
 * Format date as locale-dependent string
 */
export function toDateString(date) {
	return moment(date).format('LL');
}

/**
 * Format date as a string compatible with the import tool of Day One
 */
export function toDayOneDate(date) {
	return moment(date).format('DD MMMM YYYY [at 00:00:00 GMT]');
}

/**
 * Format date as string for inclusion in file name
 */
export function toFilenameDate(date) {
	return moment(date).format('YYYY-MM-DD-HH[h]mm');
}

/**
 * Format date as diary object index
 */
export function toIndexDate(date) {
	return moment(date).format('YYYY-MM-DD');
}

/**
 * Format date as month and year
 */
export function toMonthYearString(date) {
	return moment(date).format('MMMM YYYY');
}

/**
 * Format date as locale-dependent string with weekday
 */
export function toWeekdayDateString(date) {
	return moment(date).format('dddd, LL');
}
