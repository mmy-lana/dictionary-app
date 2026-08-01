<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    value?: string;
    label?: string;
    error?: string;
    hint?: string;
    onclear?: () => void;
  }

  let {
    value = $bindable(''),
    label,
    error,
    hint,
    placeholder = 'Search for any word...',
    id = `input-${Math.random().toString(36).substring(2, 9)}`,
    class: className = '',
    onclear,
    ...restProps
  }: Props = $props();

  let inputElement = $state<HTMLInputElement | null>(null);

  function handleClear() {
    value = '';
    onclear?.();
    inputElement?.focus();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && value) {
      handleClear();
    }
  }
</script>

<div class="w-full flex flex-col gap-1.5 font-serif">
  {#if label}
    <label for={id} class="text-xs tracking-wider uppercase text-stone-600 font-semibold">
      {label}
    </label>
  {/if}

  <div class="relative flex items-center w-full">
    <div class="absolute left-4 pointer-events-none text-stone-400">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>

    <input
      {id}
      bind:this={inputElement}
      bind:value
      {placeholder}
      onkeydown={handleKeyDown}
      class={`w-full bg-[#FDFBF7] text-stone-900 placeholder:text-stone-400 placeholder:italic font-serif text-lg md:text-xl pl-12 pr-12 py-3.5 border-b-2 border-stone-900 focus:outline-none focus:border-stone-900 focus:ring-0 transition-colors ${
        error ? 'border-red-700' : 'border-stone-900'
      } ${className}`}
      {...restProps}
    />

    {#if value}
      <button
        type="button"
        onclick={handleClear}
        aria-label="Clear input search text"
        class="absolute right-4 p-1 text-stone-400 hover:text-stone-900 transition-colors focus:outline-none"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    {/if}
  </div>

  {#if error}
    <p class="text-xs text-red-700 italic mt-1">{error}</p>
  {:else if hint}
    <p class="text-xs text-stone-500 italic mt-1">{hint}</p>
  {/if}
</div>