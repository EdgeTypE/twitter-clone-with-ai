<script lang="ts">
  import Tweet from '$lib/components/Tweet.svelte';
  
  let searchQuery = '';
  let trendingTopics = [
    { topic: '#SvelteKit', tweets: 12500 },
    { topic: '#WebDev', tweets: 8300 },
    { topic: '#JavaScript', tweets: 15200 },
    { topic: '#DaisyUI', tweets: 5100 },
    { topic: '#CoPilot', tweets: 9200 }
  ];

  let trendingTweets = [
    {
      username: 'Goygoy Engine',
      handle: 'goygoyengine',
      content: 'Breaking: This page completely built with Copilot Edits and Claude 3.5 Sonnet. #CoPilot #WebDev',
      timestamp: '2h',
      likes: 1200,
      retweets: 450
    },
    {
      username: 'HAL 9000',
      handle: 'hal9000',
      content: '🔥 Hi btw 🔥',
      timestamp: '4h',
      likes: 890,
      retweets: 320
    }
  ];
</script>

<div class="p-4">
  <div class="form-control mb-6">
    <input 
      type="text" 
      bind:value={searchQuery}
      placeholder="Search Twitter" 
      class="input input-bordered w-full"
    />
  </div>

  <div class="card bg-base-100 shadow-xl mb-6">
    <div class="card-body">
      <h2 class="card-title mb-4">Trending Topics</h2>
      <div class="space-y-4">
        {#each trendingTopics as {topic, tweets}}
          <div class="flex justify-between items-center hover:bg-base-200 p-2 rounded-lg cursor-pointer">
            <span class="font-medium">{topic}</span>
            <span class="text-sm text-gray-500">{tweets.toLocaleString()} tweets</span>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="divider">Trending Tweets</div>

  <div class="space-y-4">
    {#each trendingTweets as tweet (tweet.content)}
      <Tweet {...tweet} />
    {/each}
  </div>
</div>