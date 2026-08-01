<script lang="ts">
  import { onDestroy } from 'svelte';
  import { AudioController } from '$lib/utils/audio';

  interface Props {
    audioUrl?: string;
    word?: string;
    label?: string;
  }

  let { audioUrl = '', word = '', label = 'Play pronunciation audio' }: Props = $props();

  let isPlaying = $state(false);
  let isLoading = $state(false);
  let errorMessage = $state<string | null>(null);

  const controller = new AudioController((playing, loading, error) => {
    isPlaying = playing;
    isLoading = loading;
    errorMessage = error;
  });

  async function togglePlay() {
    if (!audioUrl && !word) {
      errorMessage = 'No audio source provided';
      return;
    }

    if (isPlaying) {
      controller.stop();
    } else {
      try {
        await controller.play(audioUrl, word);
      } catch (e) {
        // Handled inside AudioController callback
      }
    }
  }

  onDestroy(() => {
    controller.destroy();
  });
</script>

<div class="inline-flex items-center gap-3 font-serif">
  <button
    type="button"
    onclick={togglePlay}
    disabled={(!audioUrl && !word) || isLoading}
    aria-label={label}
    title={audioUrl || word ? label : 'No audio available'}
    class={`relative flex items-center justify-center w-12 h-12 rounded-full border border-stone-900 bg-[#FDFBF7] text-stone-900 transition-all duration-200 hover:bg-stone-900 hover:text-[#FDFBF7] disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 ${
      isPlaying ? 'bg-stone-900 text-[#FDFBF7]' : ''
    }`}
  >
    {#if isLoading}
      <svg class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
    {:else if isPlaying}
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
      </svg>
    {:else}
      <svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    {/if}
  </button>

  {#if isPlaying}
    <div class="flex items-center gap-1 h-4" aria-live="polite">
      <span class="w-1 h-full bg-stone-900 animate-pulse"></span>
      <span class="w-1 h-3/4 bg-stone-900 animate-pulse delay-75"></span>
      <span class="w-1 h-1/2 bg-stone-900 animate-pulse delay-150"></span>
    </div>
  {/if}

  {#if errorMessage}
    <span class="text-xs text-red-700 italic">{errorMessage}</span>
  {/if}
</div>