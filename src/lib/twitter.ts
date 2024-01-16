'use server'
import { Rettiwt, Tweet, User } from "rettiwt-api";

const rettiwt = new Rettiwt();

export const userProfile = async (id: string) => {
  try {
    const details = (await rettiwt.user.details(id)) as User;
    if (details.profileImage) {
      details.profileImage = details.profileImage.replace('_normal', '');
    }
    return details;
  } catch (error) {
    throw new Error(`Failed to fetch user profile: ${(error as Error).message}`);
  }
};

export const userTweet = async (id: string) => {
  try {
    const tweet = (await rettiwt.tweet.details(id)) as Tweet;
    if (tweet.tweetBy.profileImage) {
      tweet.tweetBy.profileImage = tweet.tweetBy.profileImage.replace('_normal', '');
    }
    return tweet;
  } catch (error) {
    throw new Error(`Failed to fetch user tweet: ${(error as Error).message}`);
  }
};

export const userTimeline = async (id: string) => {
  try {
    const timeline = await rettiwt.user.timeline(id);
    if (timeline.list[0].tweetBy.profileImage) {
      timeline.list[0].tweetBy.profileImage = timeline.list[0].tweetBy.profileImage.replace('_normal', '');
    }
    return timeline;
  } catch (error) {
    throw new Error(`Failed to fetch user timeline: ${(error as Error).message}`);
  }
};

