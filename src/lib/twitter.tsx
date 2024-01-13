"use server";
import { Rettiwt, Tweet, User } from "rettiwt-api";

export const profile = async (id: string) => {
  const rettiwt = new Rettiwt();

  // Fetching the details of the user whose username is <username>
  try {
    const details = (await rettiwt.user.details(id)) as User;
    if (details.profileImage) {
      details.profileImage = details.profileImage.replace('_normal', '');
    }
    console.log(details);
    return details;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const twitterTweet = async (id: string) => {
	const rettiwt = new Rettiwt();

	try {
    const tweet = (await rettiwt.tweet.details(id)) as Tweet;
    if (tweet.tweetBy.profileImage) {
      tweet.tweetBy.profileImage = tweet.tweetBy.profileImage.replace('_normal', '');
    }
		return tweet;
	} catch (error) {
		console.log(error);
		return error;
	}
};