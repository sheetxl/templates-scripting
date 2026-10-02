import { Observable, Subscriber } from '@sheetxl/primitives';

/**
 * Count down from a start value to a stop value.
 * 
 * @param start The first step
 * @param stop The last step
 * @param step The decrement step
 * @param wait The wait time in milliseconds between steps
 * @hidden Observable and realtime not yet completed.
 * 
 * @remarks
 * Example function that streams a countdown to 0 (or another "stop" value).
 * In this example the spreadsheet will return a new value every `wait` milliseconds.
 */
export function countDown(
  start: number,
  stop: number = 0,
  step: number = 1,
  wait: number = 1000
): Observable<number> {
  return new Observable<number>((subscriber: Subscriber<number>) => {
    let current = start;

    const id = setInterval(() => {
      subscriber.next(current);
      current -= step;

      if (current < stop) {
        clearInterval(id);
        subscriber.complete();
      }
    }, wait);

    // The function we return here is our teardown logic,
    // not guaranteed to be called but will be called when the sheet is shutdown or the function is cleared.
    return () => clearInterval(id);
  });
}

