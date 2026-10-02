/**
 * Autofill to the end of the sheet.
 *
 * @remarks
 * * Action on the selected range
 * * extend to next value
 * * select the range
 */
export function autofillDown(selected: SheetXL.ICellRange): void {
  selected
    .autoFill(
      selected.getExtended(SheetXL.Direction.Down) // includes next block
      .getResizeBy(-1, 0) // adjust
    )
    .select();
}