<script lang="ts">
  import { tweetStore, type Tweet as TweetType } from '$lib/stores/tweets';
  import { profileStore } from '$lib/stores/profile';
  import Tweet from '$lib/components/Tweet.svelte';
  import ProfileEditor from '$lib/components/ProfileEditor.svelte';

  let showEditor = false;
  let activeTab: 'tweets' | 'replies' | 'media' | 'likes' = 'tweets';

  $: userTweets = $tweetStore.filter(tweet => tweet.handle === $profileStore.handle);

  function handleProfileUpdate(event: CustomEvent<{
    username: string;
    bio: string;
    location: string;
    website: string;
  }>) {
    profileStore.updateProfile(event.detail);
    showEditor = false;
  }
</script>

<div class="bg-primary h-48 relative">
  <div class="absolute -bottom-20 left-4">
    <div class="avatar placeholder">
      <div class="bg-neutral text-neutral-content rounded-full w-32 ring ring-base-100 ring-4">
        <span class="text-3xl">{$profileStore.username[0]}</span>
      </div>
    </div>
  </div>
</div>

<div class="pt-24 px-4">
  <div class="flex justify-between items-start">
    <div>
      <h1 class="text-2xl font-bold">{$profileStore.username}</h1>
      <p class="text-gray-500">@{$profileStore.handle}</p>
    </div>
    <button class="btn btn-outline" on:click={() => showEditor = true}>
      Edit Profile
    </button>
  </div>
  
  <div class="mt-4 space-y-2">
    <p>{$profileStore.bio}</p>
    <div class="flex gap-4 text-gray-600">
      <span class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {$profileStore.location}
      </span>
      <span class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <a href={$profileStore.website} class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
          {$profileStore.website.replace('https://', '')}
        </a>
      </span>
      <span class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Joined {$profileStore.joinedDate}
      </span>
    </div>
    <div class="flex gap-4">
      <a href="/profile/following" class="hover:underline">
        <strong>{$profileStore.following}</strong> Following
      </a>
      <a href="/profile/followers" class="hover:underline">
        <strong>{$profileStore.followers}</strong> Followers
      </a>
    </div>
  </div>
</div>

<div class="border-t border-base-300 mt-4">
  <div class="tabs tabs-bordered">
    <button 
      class="tab {activeTab === 'tweets' ? 'tab-active' : ''}"
      on:click={() => activeTab = 'tweets'}
    >
      Tweets
    </button>
    <button 
      class="tab {activeTab === 'replies' ? 'tab-active' : ''}"
      on:click={() => activeTab = 'replies'}
    >
      Replies
    </button>
    <button 
      class="tab {activeTab === 'media' ? 'tab-active' : ''}"
      on:click={() => activeTab = 'media'}
    >
      Media
    </button>
    <button 
      class="tab {activeTab === 'likes' ? 'tab-active' : ''}"
      on:click={() => activeTab = 'likes'}
    >
      Likes
    </button>
  </div>
  
  <div class="divide-y divide-base-300">
    {#if activeTab === 'tweets'}
      {#each userTweets as tweet (tweet.id)}
        <Tweet {...tweet} />
      {:else}
        <div class="p-8 text-center text-gray-500">
          No tweets yet. Why not post something?
        </div>
      {/each}
    {:else}
      <div class="p-8 text-center text-gray-500">
        No {activeTab} to show yet
      </div>
    {/if}
  </div>
</div>

{#if showEditor}
  <ProfileEditor 
    username={$profileStore.username}
    bio={$profileStore.bio}
    location={$profileStore.location}
    website={$profileStore.website}
    on:save={handleProfileUpdate}
    on:close={() => showEditor = false}
  />
{/if}