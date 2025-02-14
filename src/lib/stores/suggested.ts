import { writable } from 'svelte/store';

export interface SuggestedUser {
  id: string;
  username: string;
  handle: string;
  bio: string;
  isFollowing: boolean;
}

const initialSuggestedUsers: SuggestedUser[] = [
  {
    id: '1',
    username: 'Svelte News',
    handle: 'sveltenews',
    bio: 'Latest updates from the Svelte ecosystem',
    isFollowing: false
  },
  {
    id: '2',
    username: 'DaisyUI',
    handle: 'daisyui',
    bio: 'Beautiful UI components for Tailwind CSS',
    isFollowing: false
  },
  {
    id: '3',
    username: 'Web Dev Tips',
    handle: 'webdevtips',
    bio: 'Daily web development tips and tricks',
    isFollowing: false
  }
];

function createSuggestedUsersStore() {
  const { subscribe, update } = writable<SuggestedUser[]>(initialSuggestedUsers);

  return {
    subscribe,
    toggleFollow: (userId: string) => {
      update(users => 
        users.map(user => 
          user.id === userId 
            ? { ...user, isFollowing: !user.isFollowing }
            : user
        )
      );
    }
  };
}

export const suggestedUsersStore = createSuggestedUsersStore();