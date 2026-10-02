/**
 * Style Borders
 * 
 * @remarks
 * Styles can be updated using multiple inputs:
 * * shorthand strings
 * * json
 * * callbacks
 * * IStyle
 */
export function styleBorders(selected: SheetXL.ISheet): void {
  /** Get hardcoded ranges */
  const ranges = selected.getRanges('A1:D4,E5:H8');

  /** Set the border using shorthand, style color edge */
  ranges.getStyle().setBorders('double blue');

  /** Set the top border using shorthand */
  // ranges.getStyle().getBorders().setTop('double blue');

  /** Set the top border using json with shorthand property */
  // ranges.getStyle().setBorders({ top: 'double blue' });

  /** Set the top border via style and color */
  // ranges.getStyle().getBorders().getTop().setStyle('double').setColor('blue');

  /** Set the border via update */
  // ranges.getStyle().update({ borders: 'double blue' });

  /** Set the border via update */
  // ranges.getStyle().update({ borders: { top: 'double blue' }});
}