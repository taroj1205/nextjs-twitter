import { IconButton, Link } from "@yamada-ui/react";
import { LuMail } from "react-icons/lu";

export const SendMessage = ({ id }: { id: string }) => {
	return (
		<IconButton
			icon={<LuMail />}
			as={Link}
			isExternal
			href={
				"https://twitter.com/messages/compose?recipient_id=" +
				id +
				"&text=Hi there!"
			}
			mr={-2}
			variant={"outline"}
			colorScheme={"gray"}
		/>
	);
};
