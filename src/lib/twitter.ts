'use server'
import { Rettiwt, Tweet, User } from "rettiwt-api";
import Cookies from 'cookies';

let cookies: Cookies | null = null;

export const setCookies = (req: any, res: any) => {
  cookies = new Cookies(req, res);
};

const getProxyUrl = async () => {
  let proxyUrl = cookies ? cookies.get('proxyUrl') : null;

  if (!proxyUrl) {
    try {
      const response = await fetch('https://api.github.com/repos/monosans/proxy-list/contents/proxies_anonymous/http.txt', {
        headers: {
          'Accept': 'application/vnd.github.v3.raw'
        }
      });
      const data = await response.text();
      const proxyList = data.split('\n');
      proxyUrl = proxyList[0];

      
      if (cookies) {
        cookies.set('proxyUrl', proxyUrl, { maxAge: 30 * 60 * 1000 });
      }
    } catch (error) {
      console.error(`Failed to fetch proxy list: ${(error as Error).message}`);
      throw new Error(`Failed to fetch proxy list: ${(error as Error).message}`);
    }
  }

  return proxyUrl;
};

export const userProfile = async (id: string) => {
  try {
    const proxyUrl = await getProxyUrl();
    const rettiwt = new Rettiwt({ proxyUrl: new URL(`http://${proxyUrl}`), logging: true });

    try {
      const details = (await rettiwt.user.details(id)) as User;
      if (details.profileImage) {
        details.profileImage = details.profileImage.replace('_normal', '');
      }
      return details;
    } catch (error) {
      throw new Error(`Failed to fetch user profile: ${(error as Error).message}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch proxy list: ${(error as Error).message}`);
  }
};

export const userTweet = async (id: string) => {
  const proxyUrl = await getProxyUrl()
  const rettiwt = new Rettiwt({ proxyUrl: new URL(`http://${proxyUrl}`), logging: true });
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
  const proxyUrl = await getProxyUrl()
  const rettiwt = new Rettiwt({ proxyUrl: new URL(`http://${proxyUrl}`), logging: true });
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

