import numpy as np


def trendLine(knownYs: np.ndarray, knownXs: np.ndarray) -> np.ndarray:
    """The slope and intercept of the least-squares trend line.

    Array math with numpy: each range arrives as an array, and the array returned spills, the
    slope beside the intercept, as LINEST gives them. numpy loads the first time the function is
    used.

    Args:
        knownYs: The y values, a row or a column.
        knownXs: The x values, as many as the y values.
    """
    return np.polyfit(knownXs.ravel(), knownYs.ravel(), 1)
