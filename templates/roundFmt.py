import math

from sheetxl import FormulaContext


def roundFmt(num: float, numDigits: int = 0) -> float:
    """Round and format

    Demonstrates the use of the FormulaContext to format a result. Rounds half away from zero,
    as Excel's ROUND does.

    Args:
        num: The number to round and format.
        numDigits: The number of digits to round to.
    """
    sign = 1 if num > 0 else -1
    multiplier = 10 ** abs(numDigits)
    if numDigits > 0:
        FormulaContext.formatResults('0.' + '0' * numDigits)
        return sign * math.floor(abs(num) * multiplier + 0.5) / multiplier
    if numDigits == 0:
        FormulaContext.formatResults('0')
        return sign * math.floor(abs(num) + 0.5)
    FormulaContext.formatResults('0.' + '0' * -numDigits)
    return sign * math.floor(abs(num) / multiplier + 0.5) * multiplier
