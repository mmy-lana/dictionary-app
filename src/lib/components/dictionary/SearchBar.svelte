<script lang="ts">
  import Input from '$lib/components/ui/Input.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  interface Props {
    searchTerm?: string;
    isLoading?: boolean;
    onSearch: (word: string) => void;
  }

  let { searchTerm = '', isLoading = false, onSearch }: Props = $props();

  let query = $state('');

  $effect(() => {
    query = searchTerm;
  });

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }
</script>

<form onsubmit={handleSubmit} class="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-end">
  <div class="w-full">
    <Input
      bind:value={query}
      placeholder="Type a word to look up..."
      hint="Press Enter or click Search to define."
    />
  </div>

  <Button type="submit" variant="editorial" size="lg" {isLoading} class="whitespace-nowrap w-full sm:w-auto h-[54px] mb-[2px]">
    Lookup
  </Button>
</form>