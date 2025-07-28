/**
 * Set the background fill to a random theme color.
 *
 * @summary Random Fill Color
 */
export function randomColor(selected: SheetXL.ICellRanges): void {
  //selected.getStyle().setFill('accent' + (Math.floor(Math.random() * 6) + 1));
  selected.updateStyle({ fill: 'accent' + (Math.floor(Math.random() * 6) + 1) });
}