import math


def roundFmt(num: float, numDigits: int = 0) -> float:
    """Rounds a number to a number of digits.

    Rounds half away from zero, as Excel's ROUND does.

    Args:
        num: The number to round.
        numDigits: The number of digits to round to.
    """
    sign = 1 if num > 0 else -1
    multiplier = 10 ** abs(numDigits)
    if numDigits > 0:
        return sign * math.floor(abs(num) * multiplier + 0.5) / multiplier
    if numDigits == 0:
        return sign * math.floor(abs(num) + 0.5)
    return sign * math.floor(abs(num) / multiplier + 0.5) * multiplier
