/**
 * Set a border style on ranges using a string shorthand.
 *
 * @summary Style Borders
 * 
 * @remarks
 * Styles can be updated using multiple inputs:
 * * shorthand strings
 * * json
 * * callbacks
 * * IStyle objects
 */
export function styleBorders(selectedSheet: SheetXL.ISheet): void {
  /** Get hardcoded ranges */
  const ranges = selectedSheet.getRanges('A1:D4,E5:H8');

  /** Set the border using shorthand, style color edge */
  // ranges.getStyle().setBorder('double blue');

  /** Set the top border using json with shorthand property */
  // ranges.getStyle().setBorder({ top: 'double blue' });

  // /** Set the top border using json with shorthand property */
  // ranges.getStyle().getBorder().setTop('double blue');

  // ranges.getStyle().getBorder().getTop().setStyle('double').setColor('blue');

  /** Set the border */
  ranges.updateStyle({ border: 'double blue' });
}