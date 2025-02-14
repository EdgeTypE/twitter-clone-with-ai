<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    close: void;
    save: {
      username: string;
      bio: string;
      location: string;
      website: string;
    };
  }>();

  export let username: string;
  export let bio: string;
  export let location: string;
  export let website: string;

  let editedUsername = username;
  let editedBio = bio;
  let editedLocation = location;
  let editedWebsite = website;

  function handleSave() {
    dispatch('save', {
      username: editedUsername,
      bio: editedBio,
      location: editedLocation,
      website: editedWebsite
    });
  }

  function handleClose() {
    dispatch('close');
  }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-overlay">
  <div class="bg-base-100 rounded-lg w-full max-w-lg p-4 modal-content">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Edit Profile</h2>
      <button class="btn btn-ghost btn-sm btn-circle" on:click={handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="space-y-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input 
          type="text" 
          bind:value={editedUsername}
          class="input input-bordered" 
          maxlength="50"
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Bio</span>
        </label>
        <textarea 
          bind:value={editedBio}
          class="textarea textarea-bordered" 
          rows="3"
          maxlength="160"
        ></textarea>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Location</span>
        </label>
        <input 
          type="text" 
          bind:value={editedLocation}
          class="input input-bordered" 
          maxlength="30"
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Website</span>
        </label>
        <input 
          type="url" 
          bind:value={editedWebsite}
          class="input input-bordered" 
          placeholder="https://example.com"
        />
      </div>
    </div>

    <div class="mt-6 flex justify-end">
      <button class="btn btn-primary" on:click={handleSave}>
        Save
      </button>
    </div>
  </div>
</div>