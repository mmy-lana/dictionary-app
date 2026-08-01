import { json, type RequestHandler } from '@sveltejs/kit';
import { DictionaryService } from '$lib/services/dictionaryApi';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('q');

  if (!query) {
    return json({ error: 'Query parameter "q" is required.' }, { status: 400 });
  }

  try {
    const data = await DictionaryService.fetchWord(query);
    return json(data, {
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch definition';
    return json({ error: message }, { status: 404 });
  }
};