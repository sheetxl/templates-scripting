/**
 * Example to show:
 * - Return either a single array for column or an array of arrays for rows.
 * - Documentation for the function.
 *
 * @summary Generate the Fibonacci sequence.
 * 
 * @param count The number of Fibonacci numbers to generate.
 * @param startAt The starting position in the sequence.
 * @param columns If true will return columns instead of rows.
 */
export function fibonacci(count: number=10, startAt: number=1, columns: boolean=false): number[][] {
  if (count <= 0) throw new Error('Count must be greater than 0.');
  const result = new Array(count);

  let prev = 0;
  let current = 1;
  result[0]= columns ? current : [current];
  for (let position=1; position <= startAt + count - 1; position++) {
    if (position >= startAt) {
      // rows are array of arrays so we give each value it's own array
      result[position - startAt] = columns ? current : [current];
    }
    const next = prev + current;
    prev = current;
    current = next;
  }

  return result;
}