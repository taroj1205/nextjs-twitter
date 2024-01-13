import { profile } from "@/lib/twitter";
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
} from "@yamada-ui/react";
import { User } from "rettiwt-api";
import { Twemoji } from "react-emoji-render";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { headers } from "next/headers";
import Image from "next/image";
import { ProfileImage } from "./ProfileImage";
import { ThumbnailImage } from "./ThumbnailImage";

const hashTagToLink = (text: string) => {
  return text.match(/(\S+|\n)/g)?.map((word, index) => {
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
					<Link
						href={`/profile/${userName}`}>
						{"@" + userName}
					</Link>
					{period}{" "}
				</span>
			);
    } else if (/^http(s)?:\/\/[^\s]+$/.test(word)) {
      return (
        <span key={index}>
          <Link href={word} isExternal>
            {word}
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

export const UserDetails = async ({ id }: { id: string }) => {
	const data = (await profile(id)) as User;

	if (!data) {
		return <Heading as="h2">User Not Found</Heading>;
	}

	const headerList = headers();

	const lang = headerList.get("Accept-Language") || "en";
	const preferredLang = lang.split(",")[0] === "ja" ? "ja-JP" : "en-US";

  console.log(preferredLang);
  
	return (
		<Card maxW={500} variant={"outline"}>
			<CardHeader p={0}>
				<VStack>
					<ThumbnailImage src={data.profileBanner} alt={data.fullName} />
          <ProfileImage src={data.profileImage} alt={data.fullName} />
					<HStack gap={3} ml={4}>
						<VStack gap={1} align="start">
							<Twemoji
								className="emoji text-xl font-bold"
								text={data.fullName}
							/>
							<Link
								size="sm"
								isExternal
								href={`https://twitter.com/${data.userName}`}
								color={"gray.500"}
								mt={-1}>
								@{data.userName}
							</Link>
							<HStack>
								<Text>
									<Link
										color={["black", "white"]}
										isExternal
										href={`https://twitter.com/${data.userName}/following`}>
										<span className="font-semibold">
											{data.followingsCount.toLocaleString()}
										</span>{" "}
                    {preferredLang === "en-US" ? "Following" : "フォロー中"}
									</Link>
								</Text>
								<Text>
									<Link
										color={["black", "white"]}
										isExternal
										href={`https://twitter.com/${data.userName}/followers`}>
										<span className="font-semibold">
											{data.followersCount.toLocaleString()}
										</span>{" "}
										{preferredLang === "en-US" ? "Followers" : "フォロワー"}
									</Link>
								</Text>
							</HStack>
						</VStack>
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
								{/^http(s)?:\/\/[^\s]+$/.test(data.location) ? (
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
								{new Date(data.createdAt).toLocaleDateString(preferredLang, {
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
											{data.statusesCount.toLocaleString()}
										</span>{" "}
										{preferredLang === "en-US" ? "Tweets" : "ツイート"}
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
											{data.favouritesCount.toLocaleString()}
										</span>{" "}
                    {preferredLang === "en-US" ? "Likes" : "いいね"}
									</Link>
								</Text>
							)}
					</Wrap>
				</VStack>
			</CardFooter>
		</Card>
	);
};
