def fibonacci(count: int = 10, startAt: int = 1, columns: bool = False) -> list[list[int]]:
    """Generate the Fibonacci sequence.

    Example to show returning a range that spills: a list of rows, each a list of values.

    Args:
        count: The number of Fibonacci numbers to generate.
        startAt: The starting position in the sequence.
        columns: If true will return columns instead of rows.
    """
    if count <= 0:
        raise ValueError("Count must be greater than 0.")
    sequence = []
    previous, current = 0, 1
    for position in range(1, startAt + count):
        if position >= startAt:
            sequence.append(current)
        previous, current = current, previous + current
    return [sequence] if columns else [[value] for value in sequence]
