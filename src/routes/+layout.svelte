<script>
  import "../app.css";
  import Navigation from "$lib/components/Navigation.svelte";
  import SuggestedUsers from "$lib/components/SuggestedUsers.svelte";
</script>

<div class="min-h-screen bg-base-200">
  <div class="container mx-auto flex">
    <Navigation />
    <main class="flex-1 border-x border-base-300 bg-base-100 min-h-screen">
      <slot />
    </main>
    <div class="w-80 p-4">
      <div class="sticky top-4 space-y-4">
        <div class="form-control">
          <input type="text" placeholder="Search" class="input input-bordered w-full" />
        </div>
        <SuggestedUsers />
      </div>
    </div>
  </div>
</div>