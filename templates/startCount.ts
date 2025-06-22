import { FormulaContext } from '@sheetxl/primitive';

/**
 * There are 3 correct ways to store state.
 *
 * 1. Function state. - State that is unique to a single function. Ephemeral.
 * 2. Document state. - State stored with the document. Must be serializable.
 *                      All functions can share this state by using the key.
 * 3. User state.     - State store by user. Must be serializable.
 *                      This will be stored as part of the user profile.
 *
 * Additionally there is a 4th state but it is not recommended.
 * 4. Module state.   - **Not recommended** This is variables declared within the module context.
 *                      While these maybe shared across functions in a module they are not shared across threads or sessions.
 */
let calcs = 0;
/**
 * Demonstrates how to use function state. This is useful for
 * caching values between calls to the function.
 *
 * This can be demonstrated by pressing F9 to see the count increase.
 *
 * @summary Return a count of the number of times this function has been called.
 */
export function startCount(): number {
  // FormulaContext.useStorage('count', 1);

  // TODO - const [count, setCount] = FormulaContext.useState(1);
  // const nextCount = count + 1;
  // setCount(nextCount);
  // return nextCount;

  // marking as volatile is not needed for state but causes the function to be re-evaluated on every calculation.
  FormulaContext.markVolatile();
  return ++calcs;
}
/**
 * Demonstrates how to use storage state. This is similar to useState but it global and uses
 * a key. Any functions that use the same key can retrieve the state.
 */
export function startCountAll(): number {
  // TODO - const [count, setCount] = FormulaContext.useDocumentState('count', 1);
  // const nextCount = count + 1;
  // setCount(nextCount);
  // return nextCount;

  // marking as volatile is not needed for state but causes the function to be re-evaluated on every calculation.
  return 1;
}

