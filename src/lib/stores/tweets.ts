import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { formatTimestamp } from '$lib/utils/time';

export interface Tweet {
  id: string;
  username: string;
  handle: string;
  content: string;
  timestamp: Date;
  likes: number;
  retweets: number;
  replyTo?: string;
  media?: {
    type: 'image';
    url: string;
    alt?: string;
  }[];
}

const STORAGE_KEY = 'twitter-clone-tweets';

const createTweetStore = () => {
  const storedTweets = browser ? localStorage.getItem(STORAGE_KEY) : null;
  const initialTweets: Tweet[] = storedTweets 
    ? JSON.parse(storedTweets, (key, value) => {
        if (key === 'timestamp') return new Date(value);
        return value;
      })
    : [];
  
  const { subscribe, set, update } = writable<Tweet[]>(initialTweets);

  const store = {
    subscribe,
    addTweet: (tweet: Omit<Tweet, 'id' | 'timestamp'>) => {
      update(tweets => {
        const newTweet = {
          ...tweet,
          id: crypto.randomUUID(),
          timestamp: new Date()
        };
        const updatedTweets = [newTweet, ...tweets];
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTweets));
        }
        return updatedTweets;
      });
    },
    like: (id: string) => {
      update(tweets => {
        const updatedTweets = tweets.map(tweet => 
          tweet.id === id 
            ? { ...tweet, likes: tweet.likes + 1 }
            : tweet
        );
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTweets));
        }
        return updatedTweets;
      });
    },
    retweet: (id: string) => {
      update(tweets => {
        const updatedTweets = tweets.map(tweet => 
          tweet.id === id 
            ? { ...tweet, retweets: tweet.retweets + 1 }
            : tweet
        );
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTweets));
        }
        return updatedTweets;
      });
    },
    deleteTweet: (id: string) => {
      update(tweets => {
        const updatedTweets = tweets.filter(tweet => tweet.id !== id);
        if (browser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTweets));
        }
        return updatedTweets;
      });
    }
  };

  return store;
};

export const tweetStore = createTweetStore();