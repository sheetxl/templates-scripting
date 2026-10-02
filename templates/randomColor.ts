/**
 * Random Fill Color
 *
 * @remarks 
 * Set the background fill to a random theme color.
 */
export function randomColor(selected: SheetXL.ICellRanges): void {
  selected.getStyle().setFill('accent' + (Math.floor(Math.random() * 6) + 1));
}