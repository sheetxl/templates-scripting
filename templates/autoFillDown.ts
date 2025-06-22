/**
 * Autofill to the end of the sheet.
 *
 * @summary Autofill Down
 * @description Linear fill the current block or end of sheet
 *
 * @remarks
 * * Action on the selected range
 * * extend to next value
 * * select
 */
export function autofillDown(range: SheetXL.ISheetRange): void {
  range.autoFill(range.extend(SheetXL.AxisDirection.Down)).select();
}