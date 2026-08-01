<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'editorial';
  type Size = 'sm' | 'md' | 'lg' | 'icon';

  interface Props extends HTMLButtonAttributes {
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
    children?: Snippet;
  }

  let {
    variant = 'editorial',
    size = 'md',
    isLoading = false,
    disabled = false,
    type = 'button',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const variantStyles: Record<Variant, string> = {
    primary: 'bg-stone-900 text-stone-50 hover:bg-stone-800 active:bg-stone-950 border border-stone-900',
    secondary: 'bg-stone-200 text-stone-900 hover:bg-stone-300 active:bg-stone-400 border border-stone-300',
    outline: 'bg-transparent text-stone-900 border border-stone-400 hover:border-stone-900 hover:bg-stone-100/50',
    ghost: 'bg-transparent text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 border border-transparent',
    editorial: 'bg-[#FDFBF7] text-stone-900 border border-stone-900 hover:bg-stone-900 hover:text-stone-50 transition-colors duration-200 font-serif'
  };

  const sizeStyles: Record<Size, string> = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
    icon: 'p-2 aspect-square flex items-center justify-center'
  };
</script>

<button
  {type}
  disabled={disabled || isLoading}
  class={`inline-flex items-center justify-center font-medium tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
  {...restProps}
>
  {#if isLoading}
    <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</button>