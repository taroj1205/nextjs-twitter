import React from "react";
import {
	Box,
	Text,
	VStack,
	HStack,
	Divider,
	Link,
	Card,
	CardFooter,
	CardBody,
	Spacer,
	CardHeader,
	Wrap,
} from "@yamada-ui/react";
import Image from "next/image";
import { Tweet } from "rettiwt-api";
import { UserText, hashTagToLink } from "./UserDetails";
import { ProfileImage } from "./ProfileImage";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { TweetMediaComponent } from "./TweetMediaComponent";

export const TweetCard = ({ tweet, lang }: { tweet: Tweet; lang: string }) => {
	return (
		<Card mx={"auto"} gap={5} maxW={500} p={5} variant={"outline"}>
			<CardHeader>
				<Wrap gap={3}>
					<ProfileImage
						id={tweet.tweetBy.id}
						userName={tweet.tweetBy.userName}
						src={tweet.tweetBy.profileImage}
						alt="Profile Image"
					/>
					<UserText
						userName={tweet.tweetBy.userName}
						fullName={tweet.tweetBy.fullName}
						followingsCount={tweet.tweetBy.followingsCount}
						followersCount={tweet.tweetBy.followersCount}
						lang={lang}
					/>
				</Wrap>
			</CardHeader>
			<CardBody mt={-4}>
				<Text>{hashTagToLink(tweet.fullText)}</Text>
				{tweet.media && (
					<TweetMediaComponent
						altText={tweet.fullText}
						media={JSON.parse(JSON.stringify(tweet.media))}
					/>
				)}
			</CardBody>
			<Divider />
			<CardFooter as={VStack}>
				<HStack gap={5}>
					<Text>
						<Link
							color={["black", "white"]}
							href={`https://twitter.com/${tweet.tweetBy.userName}/status/${tweet.id}/retweets`}
							isExternal>
							<b className="font-semibold">
								{tweet.retweetCount.toLocaleString(lang)}
							</b>{" "}
							RT
						</Link>
					</Text>
					<Text>
						<Link
							color={["black", "white"]}
							href={`https://twitter.com/${tweet.tweetBy.userName}/status/${tweet.id}/likes`}
							isExternal>
							<b className="font-semibold">
								{tweet.likeCount.toLocaleString(lang)}
							</b>{" "}
							{lang === "en-US" ? "Likes" : "いいね"}
						</Link>
					</Text>

					<Text>
						<b className="font-semibold">
							{tweet.replyCount.toLocaleString(lang)}
						</b>{" "}
						{lang === "en-US" ? "Replies" : "返信"}
					</Text>
					<Text>
						<Link
							color={["black", "white"]}
							href={`https://twitter.com/${tweet.tweetBy.userName}/status/${tweet.id}/quotes`}
							isExternal>
							<b className="font-semibold">
								{tweet.quoteCount.toLocaleString(lang)}
							</b>{" "}
							{lang === "en-US" ? "Quotes" : "引用"}
						</Link>
					</Text>
				</HStack>
				<Wrap gap={1}>
					{tweet.tweetBy.location && (
						<Text className="flex flex-row items-center mr-4">
							<FaMapMarkerAlt className="mr-1" />
							{/^http(s)?:\/\/\S+$/.test(tweet.tweetBy.location) ? (
								<Link href={tweet.tweetBy.location} isExternal>
									{tweet.tweetBy.location}
								</Link>
							) : (
								tweet.tweetBy.location
							)}
						</Text>
					)}
					{tweet.tweetBy.createdAt && (
						<Text className="flex flex-row items-center">
							<FaRegCalendarAlt className="mr-1" />
							{new Date(tweet.tweetBy.createdAt).toLocaleDateString(lang, {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</Text>
					)}
				</Wrap>
				<HStack w={"full"}>
					{tweet.viewCount > 0 && (<Text>
						{tweet.viewCount.toLocaleString(lang)}{" "}
						<b className="font-semibold">
							{lang === "en-US" ? "Views" : "ビュー"}
						</b>
					</Text>)}
					<Spacer />
					<Link
						href={`https://twitter.com/${tweet.tweetBy.userName}/status/${tweet.id}`}>
						Go to Tweet
					</Link>
				</HStack>
			</CardFooter>
		</Card>
	);
};
