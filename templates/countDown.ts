import { Observable, Subscriber } from '@sheetxl/primitive';

/**
 * Example function that streams a countdown to 0 (or another "stop" value).
 * In this example the spreadsheet will return a new value every `wait` milliseconds.
 * 
 * @summary Count down from a start value to a stop value.
 * @hidden Observable and realtime not yet completed.
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

