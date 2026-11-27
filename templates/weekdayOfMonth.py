from datetime import date, timedelta


def weekdayOfMonth(year: int, month: int, dayOfWeek: int, n: int = 1) -> date:
    """Calculates the date of the Nth specific weekday of a given month and year.

    This example shows returning a date.

    Args:
        year: The full year (e.g., 2025).
        month: The month number (1 = January, ..., 12 = December).
        dayOfWeek: The target day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday).
        n: The occurrence number (1 = 1st, 2 = 2nd, etc.).
    """
    if n <= 0 or n > 5:
        raise ValueError("Occurrence 'n' must be between 1 and 5.")
    if month < 1 or month > 12 or dayOfWeek < 0 or dayOfWeek > 6:
        raise ValueError("Invalid month or dayOfWeek input.")

    first = date(year, month, 1)
    # Python counts Monday as 0; here Sunday is 0.
    firstDayOfWeek = (first.weekday() + 1) % 7
    result = first + timedelta(days=(dayOfWeek - firstDayOfWeek) % 7 + (n - 1) * 7)

    if result.month != month:
        raise ValueError("That occurrence doesn't exist in this month")
    return result
