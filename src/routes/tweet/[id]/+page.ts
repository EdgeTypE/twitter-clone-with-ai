import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

export function load() {
  // Artificial delay to show loading state
  return new Promise(resolve => setTimeout(resolve, 1000));
}