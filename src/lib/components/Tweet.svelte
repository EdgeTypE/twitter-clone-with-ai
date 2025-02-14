<script lang="ts">
  import { goto } from '$app/navigation';
  import { tweetStore } from '$lib/stores/tweets';
  import { sessionStore } from '$lib/stores/session';
  import { formatTimestamp } from '$lib/utils/time';
  
  export let username: string;
  export let handle: string;
  export let content: string;
  export let timestamp: Date;
  export let likes: number = 0;
  export let retweets: number = 0;
  export let id: string = crypto.randomUUID();
  export let media: { type: 'image'; url: string; alt?: string; }[] = [];

  $: isLiked = $sessionStore.likes.has(id);
  $: isRetweeted = $sessionStore.retweets.has(id);
  $: formattedTimestamp = formatTimestamp(timestamp);

  function handleLike(e: MouseEvent) {
    e.stopPropagation();
    sessionStore.toggleLike(id);
    tweetStore.like(id);
  }

  function handleRetweet(e: MouseEvent) {
    e.stopPropagation();
    sessionStore.toggleRetweet(id);
    tweetStore.retweet(id);
  }

  function goToTweet() {
    goto(`/tweet/${id}`);
  }

  function handleActionClick(e: MouseEvent) {
    e.stopPropagation();
  }
</script>

<div class="card w-full bg-base-100 shadow-xl hover:bg-base-200 transition-colors cursor-pointer border-b" on:click={goToTweet}>
  <div class="card-body p-4">
    <div class="flex gap-3">
      <div class="avatar placeholder">
        <div class="bg-neutral text-neutral-content rounded-full w-12">
          <span>{username[0]}</span>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <h3 class="font-bold hover:underline">{username}</h3>
          <span class="text-gray-500">@{handle}</span>
          <span class="text-gray-500">·</span>
          <span class="text-gray-500">{formattedTimestamp}</span>
        </div>
        <p class="mt-2 whitespace-pre-wrap">{content}</p>
        
        {#if media && media.length > 0}
          <div class="mt-3 rounded-lg overflow-hidden {media.length > 1 ? 'grid grid-cols-2 gap-1' : ''}">
            {#each media as item}
              <img 
                src={item.url} 
                alt={item.alt || ''} 
                class="w-full h-full object-cover max-h-96" 
              />
            {/each}
          </div>
        {/if}

        <div class="flex gap-6 mt-4">
          <button class="btn btn-ghost btn-sm gap-2" on:click={handleActionClick}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button 
            class="btn btn-ghost btn-sm gap-2 {isRetweeted ? 'text-green-500' : ''}" 
            on:click={handleRetweet}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill={isRetweeted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {retweets}
          </button>
          <button 
            class="btn btn-ghost btn-sm gap-2 {isLiked ? 'text-red-500' : ''}" 
            on:click={handleLike}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill={isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {likes}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .grid-cols-2 img {
    aspect-ratio: 16/9;
  }
</style>