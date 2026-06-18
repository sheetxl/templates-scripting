/**
 * This example show returning a date.
 *
 * @summary Calculates the date of the Nth specific weekday of a given month and year.
 *
 * @param year The full year (e.g., 2025).
 * @param month The month number (1 = January, ..., 12 = December).
 * @param dayOfWeek The target day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
 * @param n The occurrence number (1 = 1st, 2 = 2nd, etc.).
 */
export function weekdayOfMonth(
  year: number,
  month: number,
  dayOfWeek: number,
  n: number=1
): Date {
  if (n <= 0 || n > 5) {
    throw new Error("Occurrence 'n' must be between 1 and 5.");
  }
  if (month < 1 || month > 12 || dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error("Invalid month or dayOfWeek input.");
  }

  // JavaScript months are 0-indexed (0=Jan, 11=Dec)
  const jsMonth = month - 1;

  // Find the day of the week of the 1st of the month
  const firstOfMonthDate = new Date(year, jsMonth, 1);
  const firstOfMonthDayOfWeek = firstOfMonthDate.getDay(); // 0=Sun, 6=Sat

  // Calculate how many days we need to add to the 1st to get the FIRST target dayOfWeek
  let daysToAddForFirstOccurrence = dayOfWeek - firstOfMonthDayOfWeek;
  if (daysToAddForFirstOccurrence < 0) {
    // If target day is *before* the 1st day's weekday (e.g., month starts Wed(3), target is Mon(1))
    daysToAddForFirstOccurrence += 7;
  }

  // Calculate the date (day number) of the Nth occurrence
  const targetDateOfMonth = 1 + daysToAddForFirstOccurrence + (n - 1) * 7;

  // Create the potential date
  const resultDate = new Date(year, jsMonth, targetDateOfMonth);

  // Crucial Check: Does this date still fall within the original month?
  // (e.g., calculated 5th Friday but it landed in the next month)
  if (resultDate.getMonth() !== jsMonth) {
    throw new Error(`That occurrence doesn't exist in this month`);
  }

  // Clear time components for a clean date comparison if needed elsewhere
  resultDate.setHours(0, 0, 0, 0);

  return resultDate;
}