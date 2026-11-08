import { FormulaContext, FormulaError, type IFormulaContext } from '@sheetxl/primitives';

/**
 * Returns Laughter. 😂
 *
 * @param term An optional word the joke should contain.
 *
 * @remarks
 * * Illustrates `FormulaContext.defer`: the function returns what the cell should show right away
 *   and hands the fetch to `fetchJokes`, which runs once per recalculation for every cell that
 *   asked. The cell shows `Puntificating…` until its joke lands.
 * * Copy it down a thousand rows with one term and the service sees one or two requests; the
 *   jokes repeat every thirty rows. Each distinct term is one more request.
 * * Recalculating draws a page again; a page already fetched is answered by the workbook, so only
 *   a new page costs a request. Refresh All asks the service again.
 * * No joke contains the term: `#N/A`.
 * * Creates joy.
 * * Note - This is a free api service please do not abuse it.
 */
export function dadJoke(term: string = ''): string {
  // Ask for a joke. `fetchJokes` runs once the recalculation ends, with every cell's request.
  // `term` is the payload: everything the request needs, and how a recalculation recognizes a
  // question it has already asked.
  FormulaContext.defer(fetchJokes, term);
  // What the cell shows until its joke arrives.
  return 'Puntificating…';
}

/**
 * The executor `dadJoke` defers to. It runs once per recalculation with every `dadJoke` call made
 * in it, and settles each one: `call.resolve(joke)` or `call.reject(error)`.
 */
async function fetchJokes(
  calls: readonly IFormulaContext.DeferredCall<string>[],
  ctx: IFormulaContext.IDeferContext
): Promise<void> {
  // One answer per distinct term, however many cells asked for it. When an answer throws, the
  // cells that asked for that term show the error; the other terms are not affected.
  await ctx.byPayload(calls, async (term: string, group: readonly IFormulaContext.DeferredCall<string>[]): Promise<void> => {
    const jokes: string[] = await searchJokes(ctx, term);
    // No joke contains the term.
    if (jokes.length === 0) throw FormulaError.BuiltIn.NA;
    // Hand the jokes round the cells, starting over when there are more cells than jokes.
    group.forEach((call: IFormulaContext.DeferredCall<string>, i: number): void => {
      call.resolve(jokes[i % jokes.length]);
    });
  });
}

/** The service's search endpoint. */
const SEARCH_URL = 'https://icanhazdadjoke.com/search';
/** The most jokes the service returns on one page. */
const PAGE_LIMIT = 30;

/** One page of the service's search results: just the fields this template reads. */
interface SearchPage {
  /** The jokes on this page. */
  results: { joke: string }[];
  /** How many pages the term has. */
  total_pages: number;
}

/**
 * Up to thirty jokes containing `term`, from a page chosen at random.
 */
async function searchJokes(ctx: IFormulaContext.IDeferContext, term: string): Promise<string[]> {
  // Page 1 also says how many pages there are.
  const first: SearchPage = await fetchPage(ctx, term, 1);
  // A page at random, so a refresh hands out different jokes. `ctx.getRandom()` rather than
  // `Math.random()`: the calculation's random source, which a test can seed.
  const page: number = 1 + Math.floor(ctx.getRandom() * Math.max(1, first.total_pages));
  // Page 1 is already here; any other page is one more request.
  const chosen: SearchPage = page === 1 ? first : await fetchPage(ctx, term, page);
  // Some jokes end with a line break; trim it so the cell holds just the joke.
  return chosen.results.map((result: { joke: string }): string => result.joke.trim());
}

/**
 * One page of jokes containing `term`.
 */
async function fetchPage(ctx: IFormulaContext.IDeferContext, term: string, page: number): Promise<SearchPage> {
  const url: string = `${SEARCH_URL}?term=${encodeURIComponent(term)}&limit=${PAGE_LIMIT}&page=${page}`;
  // `ctx.fetch` rather than the global `fetch`: it goes through the workbook, which answers a
  // page it has already fetched, and goes back to the service on Refresh All.
  const response: Response = await ctx.fetch(url, { headers: { Accept: 'application/json' } });
  // A failed request shows as `#VALUE!` in the cells that asked.
  if (!response.ok) throw FormulaError.BuiltIn.Value;
  return await response.json() as SearchPage;
}
