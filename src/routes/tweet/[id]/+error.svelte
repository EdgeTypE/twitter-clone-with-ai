<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center min-h-[50vh] p-4">
  <div class="text-error mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  </div>
  <h1 class="text-2xl font-bold mb-2">Oops! Something went wrong</h1>
  <p class="text-gray-500 mb-4">{$page.error?.message || 'Unable to load the tweet'}</p>
  <a href="/" class="btn btn-primary">Return Home</a>
</div>