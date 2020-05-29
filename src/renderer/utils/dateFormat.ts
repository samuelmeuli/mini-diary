import moment, { Moment, MomentFormatSpecification } from "moment-timezone";

import { IndexDate } from "../types";

const DAY_ONE_DATE_FORMAT = "DD MMMM YYYY [at 00:00:00 GMT]"; // E.g. "01 January 2019 at 00:00:00 GMT"
const DATE_STRING_FORMAT = "LL"; // E.g. "January 1, 2019"
const FILE_NAME_DATE_FORMAT = "YYYY-MM-DD-HH[h]mm"; // E.g. "2019-01-01-12h30"
const INDEX_DATE_FORMAT = "YYYY-MM-DD"; // E.g. "2019-01-01"
const LOCALE_WEEKDAY_FORMAT = "dddd, LL"; // E.g. "Tuesday, January 1, 2019" for "en-us" locale
const MONTH_YEAR_FORMAT = "MMMM YYYY"; // E.g. "January 2019"

/**
 * Creates a Moment object instance for the current date and time
 */
export function createDate(): Moment {
	return moment();
}

/**
 * Creates a Moment object instance for the provided date
 */
export function parseDate(
	date: Date | Moment | string,
	format?: MomentFormatSpecification,
): Moment {
	return moment(date, format);
}

/**
 * Create and return Moment object from diary index string
 */
export function fromIndexDate(dateString: string): Moment {
	return parseDate(dateString, INDEX_DATE_FORMAT);
}

/**
 * Format date as locale-dependent string
 */
export function toDateString(date: Moment | string): string {
	return parseDate(date).format(DATE_STRING_FORMAT);
}

/**
 * Format date as a string compatible with the import tool of Day One
 */
export function toDayOneDate(date: Moment | string): string {
	return parseDate(date).format(DAY_ONE_DATE_FORMAT);
}

/**
 * Format date as string for inclusion in file name
 */
export function toFileNameDate(date: Moment | string): string {
	return parseDate(date).format(FILE_NAME_DATE_FORMAT);
}

/**
 * Format date as diary index string
 */
export function toIndexDate(date: Moment | string): IndexDate {
	return parseDate(date).format(INDEX_DATE_FORMAT);
}

/**
 * Format date as locale-dependent string with weekday
 */
export function toLocaleWeekday(date: Moment | string): string {
	return parseDate(date).format(LOCALE_WEEKDAY_FORMAT);
}

/**
 * Format date as month and year
 */
export function toMonthYear(date: Moment | string): string {
	return parseDate(date).format(MONTH_YEAR_FORMAT);
}
