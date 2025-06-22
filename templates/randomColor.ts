/**
 * Set the background fill to a random theme color.
 *
 * @summary Random Fill Color
 */
export function randomColor(ranges: SheetXL.ISheetRanges): void {
  //ranges.getStyle().setFill('accent' + (Math.floor(Math.random() * 6) + 1));
  ranges.updateStyle({ fill: 'accent' + (Math.floor(Math.random() * 6) + 1) });
}