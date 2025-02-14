<script lang="ts">
  import Tweet from '$lib/components/Tweet.svelte';
  import { tweetStore } from '$lib/stores/tweets';

  let newTweetContent = '';

  function handleTweet() {
    if (newTweetContent.trim()) {
      tweetStore.addTweet({
        username: 'Current User',
        handle: 'currentuser',
        content: newTweetContent,
        likes: 0,
        retweets: 0
      });
      newTweetContent = '';
    }
  }
</script>


<div class="border-b border-base-300 p-4">
  <div class="flex gap-4">
    <div class="avatar placeholder">
      <div class="bg-neutral text-neutral-content rounded-full w-12">
        <span>C</span>
      </div>
    </div>
    <div class="flex-1">
      <textarea 
        bind:value={newTweetContent}
        class="textarea textarea-bordered w-full" 
        placeholder="What's happening?"
        rows="3"
      ></textarea>
      <div class="flex justify-between items-center mt-2">
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button class="btn btn-ghost btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <button 
          class="btn btn-primary" 
          on:click={handleTweet}
          disabled={!newTweetContent.trim()}
        >
          Tweet
        </button>
      </div>
    </div>
  </div>
</div>

<div class="divide-y divide-base-300">
  {#each $tweetStore as tweet (tweet.id)}
    <Tweet {...tweet} />
  {/each}
</div>
