/**
 * @summary Returns Laughter. 😂
 *
 * @remarks
 * * Uses keyword `async` and returns a Promise to perform a asynchronous operation.
 * * Illustrates the use of `fetch`.
 * * Creates joy.
 * * Note - This is a free api service please do not abuse it.
 */
export async function dadJoke(): Promise<string> {
  const response = await fetch('https://icanhazdadjoke.com', {
    headers: {
      "Accept": "text/plain"
    }
  });
  return response.text();
}