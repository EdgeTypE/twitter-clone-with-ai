<script lang="ts">
  import { suggestedUsersStore } from '$lib/stores/suggested';
  import { slide } from 'svelte/transition';

  function handleFollow(userId: string) {
    suggestedUsersStore.toggleFollow(userId);
  }
</script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Who to follow</h2>
    <div class="space-y-4 mt-4">
      {#each $suggestedUsersStore as user (user.id)}
        <div class="flex items-center justify-between" transition:slide|local>
          <div class="flex items-center gap-3">
            <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content rounded-full w-10">
                <span>{user.username[0]}</span>
              </div>
            </div>
            <div>
              <p class="font-semibold">{user.username}</p>
              <p class="text-sm text-gray-500">@{user.handle}</p>
            </div>
          </div>
          <button 
            class="btn btn-sm {user.isFollowing ? 'btn-outline' : 'btn-primary'}" 
            on:click={() => handleFollow(user.id)}
          >
            {user.isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>