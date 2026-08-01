import type { WordData, ApiError } from '$lib/types/dictionary';

const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export class DictionaryService {
  public static async fetchWord(word: string): Promise<WordData[]> {
    const sanitizedWord = word.trim().toLowerCase();
    
    if (!sanitizedWord) {
      throw new Error('Please enter a word to search.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(sanitizedWord)}`);

      if (!response.ok) {
        if (response.status === 404) {
          const errorData: ApiError = await response.json().catch(() => ({
            title: 'No Definitions Found',
            message: `Sorry, we couldn't find definitions for "${word}".`,
            resolution: 'You can try searching again or check for spelling errors.'
          }));
          throw new Error(errorData.message || `No definition found for "${word}".`);
        }
        throw new Error(`Server returned HTTP state ${response.status}`);
      }

      const rawData: WordData[] = await response.json();
      return this.transformData(rawData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('An unexpected network error occurred while fetching definition.');
    }
  }

  private static transformData(data: WordData[]): WordData[] {
    if (!data || data.length === 0) return [];

    const primaryWord = data[0].word;
    const allPhonetics = data.flatMap((entry) => entry.phonetics || []);
    const allMeanings = data.flatMap((entry) => entry.meanings || []);
    const allSources = Array.from(new Set(data.flatMap((entry) => entry.sourceUrls || [])));

    // Deduplicate phonetics by text and audio URL
    const uniquePhonetics = allPhonetics
      .filter((p, index, self) =>
        (p.text || p.audio) &&
        index === self.findIndex((t) => t.text === p.text && t.audio === p.audio)
      )
      .map((p) => ({
        ...p,
        audio: p.audio ? (p.audio.startsWith('//') ? `https:${p.audio}` : p.audio) : ''
      }));

    const transformedMeanings = allMeanings.map((meaning) => ({
      ...meaning,
      synonyms: Array.from(new Set(meaning.synonyms || [])),
      antonyms: Array.from(new Set(meaning.antonyms || [])),
      definitions: (meaning.definitions || []).map((def) => ({
        ...def,
        synonyms: Array.from(new Set(def.synonyms || [])),
        antonyms: Array.from(new Set(def.antonyms || []))
      }))
    }));

    const combinedEntry: WordData = {
      word: primaryWord,
      phonetic: data[0].phonetic || uniquePhonetics.find((p) => p.text)?.text || '',
      phonetics: uniquePhonetics,
      meanings: transformedMeanings,
      license: data[0].license,
      sourceUrls: allSources
    };

    return [combinedEntry];
  }
}