//
// CalendarWeekly Utils
//

/**
 * Generates the string representation of a date.
 *
 * @param {number} month The integer representation of the month.
 * @param {number} day The integer representation of the day of the month.
 * @param {number} year The integer representation of the year.
 * @returns {string} The date as a string.
 */
export function getStringDate(
  month: number,
  day: number,
  year: number
): string {
  const mm = month.toString().padStart(2, "0")
  const dd = day.toString().padStart(2, "0")
  return `${year}-${mm}-${dd}`
}

export const ALL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const ALL_DAYS_OF_WEEK = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thur",
  "Fri",
  "Sat",
]
