<script lang="ts">
  import { onMount } from 'svelte';
  import type { WordData, SearchStatus } from '$lib/types/dictionary';
  import SearchBar from '$lib/components/dictionary/SearchBar.svelte';
  import WordHeader from '$lib/components/dictionary/WordHeader.svelte';
  import DefinitionList from '$lib/components/dictionary/DefinitionList.svelte';

  let currentWord = $state('ephemeral');
  let wordData = $state<WordData | null>(null);
  let status = $state<SearchStatus>('idle');
  let errorMessage = $state<string | null>(null);
  let searchHistory = $state<string[]>([]);

  async function handleSearch(term: string) {
    if (!term.trim()) return;

    status = 'loading';
    errorMessage = null;
    currentWord = term.trim().toLowerCase();

    try {
      const response = await fetch(`/api/dictionary?q=${encodeURIComponent(currentWord)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `No definitions found for "${currentWord}".`);
      }

      const results: WordData[] = await response.json();
      if (results && results.length > 0) {
        wordData = results[0];
        status = 'success';
        updateHistory(currentWord);
      } else {
        throw new Error(`No definition results found for "${currentWord}".`);
      }
    } catch (err: unknown) {
      status = 'error';
      wordData = null;
      errorMessage = err instanceof Error ? err.message : 'An error occurred during lookup.';
    }
  }

  function updateHistory(word: string) {
    const filtered = searchHistory.filter((item) => item !== word);
    searchHistory = [word, ...filtered].slice(0, 5);
  }

  onMount(() => {
    handleSearch(currentWord);
  });
</script>

<div class="space-y-10">
  <section aria-label="Word Search">
    <SearchBar searchTerm={currentWord} isLoading={status === 'loading'} onSearch={handleSearch} />

    {#if searchHistory.length > 0}
      <div class="max-w-2xl mx-auto mt-4 flex items-center gap-2 flex-wrap font-sans text-xs">
        <span class="text-stone-500 font-semibold uppercase tracking-wider">Recent:</span>
        {#each searchHistory as item}
          <button
            type="button"
            onclick={() => handleSearch(item)}
            class="px-2 py-0.5 border border-stone-300 rounded bg-[#FAF8F5] hover:border-stone-900 transition-colors capitalize text-stone-700"
          >
            {item}
          </button>
        {/each}
      </div>
    {/if}
  </section>

  {#if status === 'loading'}
    <div class="py-16 text-center font-serif space-y-4">
      <div class="inline-block animate-spin w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full" role="status">
        <span class="sr-only">Searching definitions...</span>
      </div>
      <p class="text-stone-600 italic">Consulting the editorial lexicon...</p>
    </div>
  {:else if status === 'error'}
    <div class="p-8 border border-red-900/20 bg-red-50/50 rounded-lg text-center font-serif max-w-2xl mx-auto space-y-3">
      <h2 class="text-2xl text-stone-900 font-normal">Definition Unavailable</h2>
      <p class="text-stone-700">{errorMessage}</p>
    </div>
  {:else if status === 'success' && wordData}
    <article class="space-y-8">
      <WordHeader {wordData} />

      <DefinitionList meanings={wordData.meanings} onSelectWord={handleSearch} />

      {#if wordData.sourceUrls && wordData.sourceUrls.length > 0}
        <footer class="pt-8 border-t border-stone-300 font-sans text-xs text-stone-500 space-y-1">
          <p class="uppercase font-semibold tracking-wider">Source Reference</p>
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            {#each wordData.sourceUrls as url}
              <a href={url} target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-stone-900 break-all">
                {url}
              </a>
            {/each}
          </div>
        </footer>
      {/if}
    </article>
  {/if}
</div>