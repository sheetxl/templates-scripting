import { FormulaContext } from '@sheetxl/primitive';

/**
 * Demonstrates the use of the FormulaContext to format a result.
 *
 * @summary Round and format
 * @description Round and format
 */
export function roundFmt(number: number, numDigits: number): number {
  const multiplier = Math.pow(10, Math.abs(numDigits));
  const sign = number > 0 ? 1 : -1;
  if (numDigits > 0) {
    FormulaContext.formatResults(`0.${'0'.repeat(numDigits)}`);
    return sign * Math.round(Math.abs(number) * multiplier) / multiplier;
  } else if (numDigits === 0) {
    FormulaContext.formatResults('0');
    return sign * Math.round(Math.abs(number));
  } else {
    FormulaContext.formatResults(`0.${'0'.repeat(-numDigits)}`);
    return sign * Math.round(Math.abs(number) / multiplier) * multiplier;
  }
};
