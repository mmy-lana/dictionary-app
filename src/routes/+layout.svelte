<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<svelte:head>
  <title>The Dictionary — Editorial Reference</title>
  <meta name="description" content="A clean, editorial dictionary application with audio pronunciations." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-[#FDFBF7] text-stone-900 font-serif selection:bg-stone-900 selection:text-stone-50 flex flex-col">
  <header class="border-b border-stone-900/10 py-6 px-4 sm:px-8">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <a href="/" class="group flex items-center gap-3">
        <span class="text-2xl font-bold tracking-tight text-stone-900 group-hover:italic transition-all">
          The Dictionary.
        </span>
      </a>

      <span class="text-xs font-sans uppercase tracking-widest text-stone-500 font-semibold border border-stone-300 px-2.5 py-1 rounded-full">
        Audio Edition
      </span>
    </div>
  </header>

  <main class="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-8 py-8 md:py-12">
    {#if children}
      {@render children()}
    {/if}
  </main>

  <footer class="border-t border-stone-900/10 py-8 px-4 sm:px-8 mt-16 text-center text-xs text-stone-500 font-sans tracking-wider uppercase">
    <p>© 2026 The Dictionary — Editorial Typography & Pronunciation Audio Guide</p>
  </footer>
</div>