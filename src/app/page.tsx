import { SearchProfile } from "@/components/SearchProfile";
import { Box, Center, Heading, Text, VStack } from "@yamada-ui/react";

const Page = () => {
return (
	<VStack p={4} maxW={500} mx="auto">
		<Heading as={"h3"}>User Details</Heading>
		<Text>
			Enter a Twitter ID below to fetch and display the user&apos;s details.
		</Text>
			<SearchProfile />
	</VStack>
);
};

export default Page;
