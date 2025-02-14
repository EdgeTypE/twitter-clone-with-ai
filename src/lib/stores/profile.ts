import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface UserProfile {
  username: string;
  handle: string;
  bio: string;
  joinedDate: string;
  following: number;
  followers: number;
  location: string;
  website: string;
}

const STORAGE_KEY = 'twitter-clone-profile';

const defaultProfile: UserProfile = {
  username: 'Current User',
  handle: 'currentuser',
  bio: 'Building awesome things with SvelteKit and DaisyUI ✨',
  joinedDate: 'March 2024',
  following: 42,
  followers: 128,
  location: 'Web Development Land',
  website: 'https://example.com'
};

const createProfileStore = () => {
  const storedProfile = browser ? localStorage.getItem(STORAGE_KEY) : null;
  const initialProfile: UserProfile = storedProfile 
    ? JSON.parse(storedProfile)
    : defaultProfile;

  const { subscribe, set, update } = writable<UserProfile>(initialProfile);

  return {
    subscribe,
    updateProfile: (updates: Partial<UserProfile>) => {
      update(profile => {
        const updatedProfile = { ...profile, ...updates };
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
        }
        return updatedProfile;
      });
    }
  };
};

export const profileStore = createProfileStore();