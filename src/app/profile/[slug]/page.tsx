import { SearchInput } from "@/components/SearchInput";
import { UserDetails } from "@/components/UserDetails";
import {
	Box,
	Center,
	Heading,
	Text,
	Skeleton,
	SkeletonCircle,
} from "@yamada-ui/react";
import { Suspense } from "react";

export default function Profile({ params }: { params: { slug: string } }) {
	return (
		<>
			<Suspense fallback={<Skeleton height={10} />}>
				<SearchInput id={params.slug} />
			</Suspense>
			<div className="flex items-center justify-center h-svh">
				<Box p={2}>
					<Suspense
						fallback={<SkeletonCircle variant="circular" h={48} w={48} />}>
						<UserDetails id={params.slug} />
					</Suspense>
				</Box>
			</div>
		</>
	);
}