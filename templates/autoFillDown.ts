/**
 * Autofill to the end of the sheet.
 *
 * @name Autofill Down
 * @summary Linear fill to the end of the sheet
 * 
 * @remarks
 * * Action on the selected range
 * * extend to next value
 * * select the range
 */
export function autofillDown(selectedRange: SheetXL.ICellRange): void {
  selectedRange
    .autoFill(selectedRange.getExtendedRange(SheetXL.Direction.Down))
    .getResizeByRange(-1, 0)
    .select();
}