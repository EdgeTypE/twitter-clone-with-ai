<script lang="ts">
  import { page } from '$app/stores';
  import Tweet from '$lib/components/Tweet.svelte';
  import { tweetStore, type Tweet as TweetType } from '$lib/stores/tweets';
  
  const tweetId = $page.params.id;
  let replyContent = '';
  
  $: tweet = $tweetStore.find(t => t.id === tweetId);
  $: replies = $tweetStore.filter(t => t.replyTo === tweetId);

  function handleReply() {
    if (replyContent.trim()) {
      tweetStore.addTweet({
        username: 'Current User',
        handle: 'currentuser',
        content: replyContent,
        likes: 0,
        retweets: 0,
        replyTo: tweetId
      });
      replyContent = '';
    }
  }
</script>

<div class="p-4">
  {#if tweet}
    <div class="mb-6">
      <Tweet {...tweet} />
    </div>

    <div class="border-t border-base-300 pt-4">
      <div class="flex gap-4 mb-6">
        <div class="avatar placeholder">
          <div class="bg-neutral text-neutral-content rounded-full w-12">
            <span>C</span>
          </div>
        </div>
        <div class="flex-1">
          <textarea 
            bind:value={replyContent}
            class="textarea textarea-bordered w-full" 
            placeholder="Tweet your reply"
            rows="3"
          ></textarea>
          <div class="flex justify-end mt-2">
            <button 
              class="btn btn-primary" 
              on:click={handleReply}
              disabled={!replyContent.trim()}
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      <div class="divider">Replies</div>

      <div class="space-y-4">
        {#each replies as reply (reply.id)}
          <Tweet {...reply} />
        {:else}
          <div class="text-center text-gray-500 py-8">
            No replies yet. Be the first to reply!
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="text-center py-8">
      <h2 class="text-xl font-bold">Tweet not found</h2>
      <p class="text-gray-500 mt-2">This tweet might have been deleted or may not exist.</p>
      <a href="/" class="btn btn-primary mt-4">Return Home</a>
    </div>
  {/if}
</div>