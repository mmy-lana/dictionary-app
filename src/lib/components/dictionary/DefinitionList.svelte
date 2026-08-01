<script lang="ts">
  import type { Meaning } from '$lib/types/dictionary';

  interface Props {
    meanings: Meaning[];
    onSelectWord?: (word: string) => void;
  }

  let { meanings, onSelectWord }: Props = $props();
</script>

<div class="space-y-10 font-serif">
  {#each meanings as meaning}
    <section class="space-y-4">
      <div class="flex items-center gap-4">
        <h2 class="text-xl md:text-2xl italic font-bold text-stone-900 capitalize font-serif">
          {meaning.partOfSpeech}
        </h2>
        <div class="h-[1px] flex-grow bg-stone-300"></div>
      </div>

      <div class="space-y-3 pl-2">
        <h3 class="text-xs uppercase font-sans tracking-widest font-bold text-stone-500">
          Meaning
        </h3>

        <ol class="space-y-4 list-decimal list-inside text-stone-800 leading-relaxed text-lg">
          {#each meaning.definitions as def}
            <li class="align-top marker:text-stone-400 marker:font-bold">
              <span class="text-stone-900">{def.definition}</span>

              {#if def.example}
                <p class="text-stone-600 text-base italic mt-1 pl-6 border-l-2 border-stone-300">
                  "{def.example}"
                </p>
              {/if}
            </li>
          {/each}
        </ol>
      </div>

      {#if meaning.synonyms.length > 0}
        <div class="flex flex-wrap items-center gap-2 pt-2 text-sm">
          <span class="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">
            Synonyms:
          </span>
          {#each meaning.synonyms as synonym}
            <button
              type="button"
              onclick={() => onSelectWord?.(synonym)}
              class="text-stone-900 font-medium underline underline-offset-4 decoration-stone-400 hover:decoration-stone-900 hover:bg-stone-200/50 px-1.5 py-0.5 rounded transition-all"
            >
              {synonym}
            </button>
          {/each}
        </div>
      {/if}

      {#if meaning.antonyms.length > 0}
        <div class="flex flex-wrap items-center gap-2 pt-1 text-sm">
          <span class="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">
            Antonyms:
          </span>
          {#each meaning.antonyms as antonym}
            <button
              type="button"
              onclick={() => onSelectWord?.(antonym)}
              class="text-stone-900 font-medium underline underline-offset-4 decoration-stone-400 hover:decoration-stone-900 hover:bg-stone-200/50 px-1.5 py-0.5 rounded transition-all"
            >
              {antonym}
            </button>
          {/each}
        </div>
      {/if}
    </section>
  {/each}
</div>