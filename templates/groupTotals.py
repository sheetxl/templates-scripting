import pandas as pd


def groupTotals(table: pd.DataFrame, groupBy: str, column: str) -> pd.DataFrame:
    """Totals one column of a table for each value of another.

    A table in, a table out, with pandas: the range arrives as a DataFrame whose column names are
    its first row, and the DataFrame returned spills with its headers. pandas loads the first time
    the function is used.

    Args:
        table: A range with a header row, such as A1:C20.
        groupBy: The header of the column to group by.
        column: The header of the column to total.
    """
    return table.groupby(groupBy)[column].sum().reset_index()
