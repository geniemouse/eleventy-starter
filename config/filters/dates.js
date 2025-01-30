/**
 * Datetime filters
 * ---
 */

import { DateTime } from "luxon";

export default {
	formatDate,
	postDate,
	toISODate,
	toISODateTime,
};

/**
 * ---
 */

/**
 * Pretty date formatting filter (customisable)
 * ---
 * @param   {Object|String}  date
 * @param   {String}  format - Luxon date format strings
 * @param   {String}  locale - Five character locale string
 * @return  {String}
 */
export function formatDate(date, format = "DATE_FULL", locale = "en-gb") {
	return handleDateType(date).toLocaleString(DateTime[format], { locale });
}

/**
 * Normalise date input in handling either object or (ISO 8601 format) string
 * ---
 * @param   {Object|String}  dateInput
 * @return  {String}
 */
function handleDateType(dateInput) {
	if (typeof dateInput === "string") {
		return DateTime.fromISO(dateInput);
	}
	return DateTime.fromJSDate(dateInput);
}

/**
 * Print 'pretty' blog post date format from given date object/string input
 * Output: "30 Aug 2023"
 * ---
 * @param   {Object|String}  date
 * @return  {String}
 */
export function postDate(date) {
	return formatDate(date, "DATE_MED");
}

/**
 * Print (ISO8610 format) date only from given date object/string input
 * Output: 2023-10-09
 * ---
 * @param   {Object|String}  date
 * @return  {String}
 */
export function toISODate(date) {
	return handleDateType(date).toUTC().toISODate({ includeOffset: true });
}

/**
 * Print (ISO8610 format) datetime from given date object/string input
 * Output: 2023-10-09T16:11:30+01:00
 * ---
 * @param   {Object|String}  date
 * @return  {String}
 */
export function toISODateTime(date) {
	return handleDateType(date).toUTC().toISO({ includeOffset: true });
}
