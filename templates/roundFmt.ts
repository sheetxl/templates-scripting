import { FormulaContext } from '@sheetxl/primitives';

/**
 * Demonstrates the use of the FormulaContext to format a result.
 *
 * @summary Round and format
 */
export function roundFmt(num: number, numDigits: number=0): number {
  const multiplier = Math.pow(10, Math.abs(numDigits));
  const sign = num > 0 ? 1 : -1;
  if (numDigits > 0) {
    FormulaContext.formatResults(`0.${'0'.repeat(numDigits)}`);
    return sign * Math.round(Math.abs(num) * multiplier) / multiplier;
  } else if (numDigits === 0) {
    FormulaContext.formatResults('0');
    return sign * Math.round(Math.abs(num));
  } else {
    FormulaContext.formatResults(`0.${'0'.repeat(-numDigits)}`);
    return sign * Math.round(Math.abs(num) / multiplier) * multiplier;
  }
};
