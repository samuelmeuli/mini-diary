import moment from "moment";

import { IndexDate } from "../types";

const INDEX_DATE_FORMAT = "YYYY-MM-DD";

/**
 * Create and return moment object from diary index string
 */
export function momentIndex(dateStr: string): moment.Moment {
	return moment(dateStr, INDEX_DATE_FORMAT);
}

/**
 * Format date as locale-dependent string
 */
export function toDateString(date: Date | moment.Moment): string {
	return moment(date).format("LL");
}

/**
 * Format date as a string compatible with the import tool of Day One
 */
export function toDayOneDate(date: Date | moment.Moment): string {
	return moment(date).format("DD MMMM YYYY [at 00:00:00 GMT]");
}

/**
 * Format date as string for inclusion in file name
 */
export function toFilenameDate(date: Date | moment.Moment): string {
	return moment(date).format("YYYY-MM-DD-HH[h]mm");
}

/**
 * Format date as diary index string
 */
export function toIndexDate(date: Date | moment.Moment): IndexDate {
	return moment(date).format(INDEX_DATE_FORMAT);
}

/**
 * Format date as locale-dependent string with weekday
 */
export function toLocaleWeekday(date: Date | moment.Moment): string {
	return moment(date).format("dddd, LL");
}

/**
 * Format date as month and year
 */
export function toMonthYear(date: Date | moment.Moment): string {
	return moment(date).format("MMMM YYYY");
}
