<script lang="ts">
  import type { WordData } from '$lib/types/dictionary';
  import PhoneticBadge from './PhoneticBadge.svelte';
  import AudioPlayer from '$lib/components/ui/AudioPlayer.svelte';

  interface Props {
    wordData: WordData;
  }

  let { wordData }: Props = $props();

  let primaryAudio = $derived.by(() => {
    const audioPhonetic = wordData.phonetics.find((p) => p.audio && p.audio.length > 0);
    return audioPhonetic ? audioPhonetic.audio : '';
  });
</script>

<header class="border-b-2 border-stone-900 pb-8 mb-8 font-serif">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div>
      <h1 class="text-5xl md:text-7xl font-normal text-stone-900 tracking-tight capitalize">
        {wordData.word}
      </h1>

      {#if wordData.phonetic}
        <p class="text-xl md:text-2xl text-stone-600 mt-2 font-serif italic">
          {wordData.phonetic}
        </p>
      {/if}
    </div>

    <div class="flex items-center gap-3 bg-[#F4F1EA] p-4 rounded-lg border border-stone-300">
      <AudioPlayer audioUrl={primaryAudio} word={wordData.word} label={`Listen to ${wordData.word}`} />
      <span class="text-xs uppercase font-sans font-semibold tracking-wider text-stone-600">
        Audio Pronunciation
      </span>
    </div>
  </div>

  {#if wordData.phonetics.length > 0}
    <div class="flex flex-wrap items-center gap-2 mt-6">
      {#each wordData.phonetics as phonetic}
        <PhoneticBadge {phonetic} word={wordData.word} />
      {/each}
    </div>
  {/if}
</header>