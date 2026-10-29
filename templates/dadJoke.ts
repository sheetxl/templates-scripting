import { FormulaContext, type IFormulaContext, FormulaError } from '@sheetxl/primitives';

const SEARCH = 'https://icanhazdadjoke.com/search';
const PAGE_LIMIT = 30; // the service's maximum per request

/**
 * Runs once per recalculation with every dadJoke call issued in it: one request per distinct
 * term, up to thirty jokes each, handed round the cells that asked for that term.
 */
async function fetchJokes(
  calls: readonly IFormulaContext.DeferredCall<string>[],
  ctx: IFormulaContext.IBatchContext
): Promise<void> {
  const byTerm = new Map<string, IFormulaContext.DeferredCall<string>[]>();
  for (const call of calls) {
    const term = call.payload as string;
    const group = byTerm.get(term);
    group ? group.push(call) : byTerm.set(term, [call]);
  }
  await Promise.all([...byTerm].map(async ([term, group]) => {
    try {
      let { results, total_pages } = await searchJokes(term, 1);
      // Every page of a term is a different thirty jokes; a refresh draws a page at random so it
      // hands out different ones. Page 1 was already fetched, so only another page costs a request.
      const page = 1 + Math.floor(ctx.getRandom() * Math.max(1, total_pages));
      if (page !== 1) ({ results } = await searchJokes(term, page));
      if (results.length === 0) throw FormulaError.BuiltIn.NA;
      group.forEach((call, i) => call.resolve(results[i % results.length].joke));
    } catch (e) {
      for (const call of group) call.reject(e); // one term's failure fails only its own cells
    }
  }));
}

async function searchJokes(term: string, page: number): Promise<{ results: { joke: string }[], total_pages: number }> {
  const url = `${SEARCH}?term=${encodeURIComponent(term)}&limit=${PAGE_LIMIT}&page=${page}`;
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw FormulaError.BuiltIn.Value;
  return response.json();
}

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
 * * A recalculation never fetches again. Refresh does, from another page when there is one.
 * * No joke contains the term: `#N/A`.
 * * Creates joy.
 * * Note - This is a free api service please do not abuse it.
 */
export function dadJoke(term: string = ''): string {
  FormulaContext.defer(fetchJokes, term);
  return 'Puntificating…';
}
