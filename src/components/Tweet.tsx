import React from 'react';
import { Box, Text, VStack, HStack, Divider } from "@yamada-ui/react";
import Image from "next/image";
import { twitterTweet } from "@/lib/twitter";
import { Tweet } from 'rettiwt-api';

const TweetComponent = async ({ id }: { id: string }) => {
  const tweet = await twitterTweet(id) as Tweet;
  return (
		<VStack align="start" gap={5} maxW={500}>
			<HStack gap={3}>
				<Image
					width={48}
					height={48}
					src={tweet.tweetBy.profileImage.replace("_normal", "")}
					alt="Profile Image"
				/>
				<VStack align="start">
					<Text fontSize="2xl" fontWeight="bold">
						{tweet.tweetBy.fullName}
					</Text>
					<Text fontSize="sm">@{tweet.tweetBy.userName}</Text>
				</VStack>
			</HStack>
			<Text>{tweet.fullText}</Text>
			<Box>
				<Text>
					<b>Location:</b> {tweet.tweetBy.location}
				</Text>
				<Text>
					<b>Created At:</b> {new Date(tweet.createdAt).toLocaleDateString()}
				</Text>
			</Box>
			<HStack gap={5}>
				<Box>
					<Text>
						<b>Retweets:</b> {tweet.retweetCount}
					</Text>
					<Text>
						<b>Likes:</b> {tweet.likeCount}
					</Text>
				</Box>
				<Box>
					<Text>
						<b>Replies:</b> {tweet.replyCount}
					</Text>
					<Text>
						<b>Quotes:</b> {tweet.quoteCount}
					</Text>
				</Box>
			</HStack>
			<Divider />
			<Text>
				<b>Views:</b> {tweet.viewCount}
			</Text>
		</VStack>
	);
};

export default TweetComponent;