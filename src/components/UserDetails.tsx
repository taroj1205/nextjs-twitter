import { userProfile } from "@/lib/twitter";
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
	CardHeader,
	Wrap,
	Heading,
	Button,
	Spacer,
} from "@yamada-ui/react";
import { User } from "rettiwt-api";
import { Twemoji } from "react-emoji-render";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { headers } from "next/headers";
import Image from "next/image";
import { ProfileImage } from "./ProfileImage";
import { ThumbnailImage } from "./ThumbnailImage";
import { SendMessage } from "./SendMessage";
import { MoreButton } from "./MoreButton";

export const hashTagToLink = (text: string) => {
	return text.split(/(?=[ 、#\n])|(?<=\n| )/)?.map((word, index) => {
		if (word.startsWith("#")) {
			const hashTag = word.slice(1);
			return (
				<span key={index}>
					<Link href={`https://twitter.com/search?q=%23${hashTag}`} isExternal>
						{word}
					</Link>{" "}
				</span>
			);
		} else if (word.startsWith("@")) {
			let userName = word.slice(1);
			let period = "";
			if (userName.endsWith(".")) {
				userName = userName.slice(0, -1);
				period = ".";
			}
			return (
				<span key={index}>
					<Link href={`/profile/${userName}`}>{"@" + userName}</Link>
					{period}{" "}
				</span>
			);
		} else if (/^http(s)?:\/\/\S+$/.test(word)) {
			const url = word.endsWith(".") ? word.slice(0, -1) : word;
			return (
				<span key={index}>
					<Link href={url} isExternal>
						{url}
					</Link>{" "}
				</span>
			);
		} else if (word === "\n") {
			return <br key={index} />;
		}
		return (
			<span key={index}>
				<Twemoji className="emoji" text={word} />{" "}
			</span>
		);
	});
};

export const UserDetails = async ({ id, user, lang }: { id: string, user?: User, lang: string }) => {
	const data = user || (await userProfile(id)) as User;
	if (!data) {
		return <Heading as="h2">User Not Found</Heading>;
	}

	return (
		<Card maxW={500} variant={"outline"}>
			<CardHeader p={0}>
				<VStack>
					<ThumbnailImage src={data.profileBanner} alt={data.fullName} />
					<HStack ml={4}>
						<Box mt={-16}>
							<ProfileImage
								id={data.id}
								userName={data.userName}
								src={data.profileImage}
								alt={data.fullName}
							/>
						</Box>
						<Spacer />
						<SendMessage id={id} />
						<MoreButton id={id} userName={data.userName} />
					</HStack>
					<HStack gap={3} ml={4}>
						<UserText
							userName={data.userName}
							fullName={data.fullName}
							followingsCount={data.followingsCount}
							followersCount={data.followersCount}
							lang={lang}
						/>
					</HStack>
				</VStack>
			</CardHeader>
			<CardBody py={4}>
				<Text>{data.description && hashTagToLink(data.description)}</Text>
			</CardBody>
			<CardFooter>
				<VStack gap={1}>
					<Wrap gap={1}>
						{data.location && (
							<Text className="flex flex-row items-center mr-4">
								<FaMapMarkerAlt className="mr-1" />
								{/^http(s)?:\/\/\S+$/.test(data.location) ? (
									<Link href={data.location} isExternal>
										{data.location}
									</Link>
								) : (
									data.location
								)}
							</Text>
						)}
						{data.createdAt && (
							<Text className="flex flex-row items-center">
								<FaRegCalendarAlt className="mr-1" />
								{new Date(data.createdAt).toLocaleDateString(lang, {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</Text>
						)}
					</Wrap>
					<Wrap gap={4}>
						{data.statusesCount !== undefined &&
							data.statusesCount !== null && (
								<Text>
									<Link
										color={["black", "white"]}
										href={`https://twitter.com/${data.userName}/with_replies`}
										isExternal>
										<span className="font-semibold">
											{data.statusesCount.toLocaleString(lang)}
										</span>{" "}
										{lang === "en-US" ? "Tweets" : "ツイート"}
									</Link>
								</Text>
							)}
						{data.favouritesCount !== undefined &&
							data.favouritesCount !== null && (
								<Text>
									<Link
										color={["black", "white"]}
										href={`https://twitter.com/${data.userName}/likes`}
										isExternal>
										<span className="font-semibold">
											{data.favouritesCount.toLocaleString(lang)}
										</span>{" "}
										{lang === "en-US" ? "Likes" : "いいね"}
									</Link>
								</Text>
							)}
					</Wrap>
				</VStack>
			</CardFooter>
		</Card>
	);
};

export const UserText = ({
	userName,
	fullName,
	followingsCount,
	followersCount,
	lang,
}: {
	userName: string;
	fullName: string;
	followingsCount: number;
		followersCount: number;
		lang: string;
}) => {
	return (
		<VStack gap={1} align="start">
			<Twemoji className="emoji text-xl font-bold" text={fullName} />
			<Link
				size="sm"
				isExternal
				href={`https://twitter.com/${userName}`}
				color={"gray.500"}
				mt={-1}>
				@{userName}
			</Link>
			<HStack>
				<Text>
					<Link
						color={["black", "white"]}
						isExternal
						href={`https://twitter.com/${userName}/following`}>
						<span className="font-semibold">
							{followingsCount.toLocaleString(lang)}
						</span>{" "}
						{lang === "en-US" ? "Following" : "フォロー中"}
					</Link>
				</Text>
				<Text>
					<Link
						color={["black", "white"]}
						isExternal
						href={`https://twitter.com/${userName}/followers`}>
						<span className="font-semibold">
							{followersCount.toLocaleString(lang)}
						</span>{" "}
						{lang === "en-US" ? "Followers" : "フォロワー"}
					</Link>
				</Text>
			</HStack>
		</VStack>
	);
};
