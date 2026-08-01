<script lang="ts">
  import type { Phonetic } from '$lib/types/dictionary';
  import AudioPlayer from '$lib/components/ui/AudioPlayer.svelte';

  interface Props {
    phonetic: Phonetic;
    word?: string;
  }

  let { phonetic, word = '' }: Props = $props();

  let regionLabel = $derived.by(() => {
    if (!phonetic.audio) return '';
    if (phonetic.audio.includes('-us.mp3') || phonetic.audio.includes('/us/')) return 'US';
    if (phonetic.audio.includes('-uk.mp3') || phonetic.audio.includes('/uk/')) return 'UK';
    if (phonetic.audio.includes('-au.mp3') || phonetic.audio.includes('/au/')) return 'AU';
    return '';
  });
</script>

{#if phonetic.text || phonetic.audio}
  <div class="inline-flex items-center gap-2 px-3 py-1.5 border border-stone-300 rounded-full bg-[#FAF8F5] text-stone-800 text-sm font-serif">
    {#if regionLabel}
      <span class="text-[10px] font-sans font-bold tracking-widest uppercase text-stone-500 border-r border-stone-300 pr-2">
        {regionLabel}
      </span>
    {/if}

    {#if phonetic.text}
      <span class="tracking-wide font-serif text-stone-800">{phonetic.text}</span>
    {/if}

    {#if phonetic.audio || word}
      <AudioPlayer audioUrl={phonetic.audio} {word} label={`Play pronunciation ${phonetic.text || ''}`} />
    {/if}
  </div>
{/if}