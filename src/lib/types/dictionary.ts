export interface License {
  name: string;
  url: string;
}

export interface Phonetic {
  text?: string;
  audio?: string;
  sourceUrl?: string;
  license?: License;
}

export interface Definition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

export interface WordData {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license?: License;
  sourceUrls: string[];
  etymology?: string;
}

export interface ApiError {
  title: string;
  message: string;
  resolution: string;
}

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

export type FontOption = 'serif' | 'sans' | 'mono';

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  progress: number;
}