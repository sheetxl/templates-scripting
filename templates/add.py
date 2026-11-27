def addTwo(number1: float, number2: float) -> float:
    """Adds two numbers.

    Illustration of a simple function that adds two numbers.

    Args:
        number1: The first number to add.
        number2: The second number to add.
    """
    return number1 + number2


def addMany(*number1: float) -> float:
    """Adds many numbers.

    Illustration of a simple function that adds an arbitrary length of numbers.

    Args:
        number1: The numbers to add.
    """
    return sum(number1)


def addRange(values: list[list[float]]) -> float:
    """Adds the numbers of a range.

    Illustration of a function that takes a range: a list of rows, each a list of values.

    Args:
        values: The cells to add.
    """
    return sum(value for row in values for value in row)
