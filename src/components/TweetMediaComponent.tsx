"use client";
import { TweetMedia } from "rettiwt-api"
import {
  Center,
  Link,
  Text,
	Image,
	useDisclosure,
} from "@yamada-ui/react";
import {
	Carousel,
	CarouselSlide,
	CarouselControlNext,
	CarouselControlPrev,
	CarouselIndicators,
} from "@yamada-ui/carousel";

export const TweetMediaComponent = ({ media, altText }: { media: TweetMedia[], altText: string }) => {
	const mediaCount = media.length;
  return (
		<Carousel h={"fit"}>
			{media.map((media) => (
				<CarouselSlide as={Center} bg={["gray.50", "gray.900"]} key={media.url}>
					{media.type === "photo" ? (
						<Link href={media.url} isExternal><Image src={media.url} alt={altText} /></Link>
					) : (
						<Text h={"md"}>This is a video, <Link href={media.url} isExternal>click here</Link></Text>
					)}
				</CarouselSlide>
			))}
			<CarouselControlNext className={mediaCount < 2 ? "!hidden" : ""} />
			<CarouselControlPrev className={mediaCount < 2 ? "!hidden" : ""} />
			<CarouselIndicators className={mediaCount < 2 ? "!hidden" : ""} />
		</Carousel>
	);
}