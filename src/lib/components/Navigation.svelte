<script lang="ts">
  import { page } from '$app/stores';
  import { tweetStore } from '$lib/stores/tweets';
  import ThemeToggle from './ThemeToggle.svelte';

  let isComposing = false;
  let tweetContent = '';
  let selectedFiles: FileList | null = null;
  let imageUrls: string[] = [];

  function handleImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      selectedFiles = input.files;
      imageUrls = [];
      
      for (const file of input.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            imageUrls = [...imageUrls, e.target.result as string];
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  function handleTweet() {
    if (tweetContent.trim()) {
      tweetStore.addTweet({
        username: 'Current User',
        handle: 'currentuser',
        content: tweetContent,
        likes: 0,
        retweets: 0,
        media: imageUrls.map(url => ({
          type: 'image' as const,
          url
        }))
      });
      tweetContent = '';
      imageUrls = [];
      selectedFiles = null;
      isComposing = false;
    }
  }

  function resetComposer() {
    isComposing = false;
    tweetContent = '';
    imageUrls = [];
    selectedFiles = null;
  }
</script>

<div class="h-screen flex flex-col w-64 px-4">
  <div class="py-4">
    <div class="text-primary text-3xl px-4 mb-4 flex justify-between items-center">
      <svg viewBox="0 0 24 24" class="h-8 w-8 fill-current">
        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
      </svg>
      <ThemeToggle />
    </div>
    <nav class="space-y-2">
      <a href="/" class="btn btn-ghost justify-start w-full {$page.url.pathname === '/' ? 'btn-active' : ''}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="ml-4">Home</span>
      </a>
      <a href="/explore" class="btn btn-ghost justify-start w-full {$page.url.pathname === '/explore' ? 'btn-active' : ''}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
        <span class="ml-4">Explore</span>
      </a>
      <a href="/profile" class="btn btn-ghost justify-start w-full {$page.url.pathname === '/profile' ? 'btn-active' : ''}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="ml-4">Profile</span>
      </a>
    </nav>
    <button class="btn btn-primary w-full mt-4" on:click={() => isComposing = true}>Tweet</button>
  </div>
</div>

{#if isComposing}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-base-100 rounded-lg w-full max-w-lg p-4">
      <div class="flex justify-between items-center mb-4">
        <button class="btn btn-ghost btn-sm" on:click={resetComposer}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button 
          class="btn btn-primary btn-sm" 
          on:click={handleTweet}
          disabled={!tweetContent.trim()}
        >
          Tweet
        </button>
      </div>
      <div class="flex gap-4">
        <div class="avatar placeholder">
          <div class="bg-neutral text-neutral-content rounded-full w-12">
            <span>C</span>
          </div>
        </div>
        <div class="flex-1">
          <textarea 
            bind:value={tweetContent}
            class="textarea w-full min-h-[120px] text-lg border-none resize-none" 
            placeholder="What's happening?"
          ></textarea>
          
          {#if imageUrls.length > 0}
            <div class="grid grid-cols-2 gap-2 mt-2">
              {#each imageUrls as url}
                <img src={url} alt="Tweet attachment" class="rounded-lg w-full h-32 object-cover" />
              {/each}
            </div>
          {/if}

          <div class="flex justify-between items-center mt-4">
            <div class="flex gap-2">
              <label class="btn btn-ghost btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  class="hidden" 
                  on:change={handleImageSelect}
                />
              </label>
              <button class="btn btn-ghost btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <div class="text-sm text-gray-500">
              {tweetContent.length}/280
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}