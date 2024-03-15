import React, { Suspense } from "react";
import { userProfile, userTimeline } from "@/lib/twitter";
import {
	Box,
	Card,
	Center,
	Heading,
	Skeleton,
	SkeletonCircle,
	Text,
	VStack,
} from "@yamada-ui/react";
import { TweetCard } from "@/components/TweetCard";
import { Tweet } from "rettiwt-api";
import { SearchInput } from "@/components/SearchInput";
import { UserDetails } from "@/components/UserDetails";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

type Props = {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const user = params.slug;
	return {
		title: `Twitter Profile Viewer | ${user}`,
		description: "View your Twitter Profile",
		robots: { index: false, follow: false },
	};
}

const TimelinePage = async ({ params }: { params: { slug: string } }) => {
	const slug = params.slug;
	const user = await userProfile(slug);

	const id = user.id;

	const timeline = await userTimeline(id);

	console.log(timeline.list.length)

	const headerList = headers();

	const lang = headerList.get("Accept-Language") || "en";
	const preferredLang = lang.split(",")[0] === "ja" ? "ja-JP" : "en-US";

	console.log(preferredLang);

	return (
		<>
			<Suspense fallback={<Skeleton height={10} />}>
				<SearchInput id={params.slug} />
			</Suspense>
			<div className="flex items-center justify-center h-svh">
				<Box p={2}>
					<Suspense
						fallback={<SkeletonCircle variant="circular" h={48} w={48} />}>
						<UserDetails id={params.slug} user={user} lang={preferredLang} />
					</Suspense>
				</Box>
			</div>
			<VStack my={5} p={2} mx={"auto"}>
				<Suspense>
					{timeline.list.slice(0, 20).map((tweet: Tweet) => (
							<TweetCard key={tweet.id} tweet={tweet} lang={preferredLang} />
					))}
				</Suspense>
			</VStack>
		</>
	);
};

export default TimelinePage;
