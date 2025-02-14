import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface UserSession {
  likes: Set<string>;
  retweets: Set<string>;
}

const STORAGE_KEY = 'twitter-clone-session';

const createSessionStore = () => {
  const storedSession = browser ? localStorage.getItem(STORAGE_KEY) : null;
  const initialSession: UserSession = storedSession 
    ? { 
        likes: new Set(JSON.parse(storedSession).likes),
        retweets: new Set(JSON.parse(storedSession).retweets)
      }
    : {
        likes: new Set(),
        retweets: new Set()
      };

  const { subscribe, update } = writable<UserSession>(initialSession);

  const store = {
    subscribe,
    toggleLike: (tweetId: string) => {
      update(session => {
        const newLikes = new Set(session.likes);
        if (newLikes.has(tweetId)) {
          newLikes.delete(tweetId);
        } else {
          newLikes.add(tweetId);
        }
        const updatedSession = { ...session, likes: newLikes };
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            likes: Array.from(updatedSession.likes),
            retweets: Array.from(updatedSession.retweets)
          }));
        }
        return updatedSession;
      });
    },
    toggleRetweet: (tweetId: string) => {
      update(session => {
        const newRetweets = new Set(session.retweets);
        if (newRetweets.has(tweetId)) {
          newRetweets.delete(tweetId);
        } else {
          newRetweets.add(tweetId);
        }
        const updatedSession = { ...session, retweets: newRetweets };
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            likes: Array.from(updatedSession.likes),
            retweets: Array.from(updatedSession.retweets)
          }));
        }
        return updatedSession;
      });
    }
  };

  return store;
};

export const sessionStore = createSessionStore();