import { IconButton, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useClipboard } from "@yamada-ui/react";
import { BiShare } from "react-icons/bi";
import { FaCheck, FaCopy } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { LuMail } from "react-icons/lu";

export const MoreButton = ({ userName, id }: { userName: string; id: string; }) => {
	const { onCopy, hasCopied } = useClipboard();
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				mt={-4}
				mr={4}
				icon={<HiDotsVertical />}
				variant="outline"
			/>

			<MenuList>
				<MenuItem
					icon={<LuMail />}
					as={Link}
					isExternal
					href={
						"https://twitter.com/messages/compose?recipient_id=" + id + "&text=Hi there!"
					}>
					Send DM
				</MenuItem>
				<MenuDivider />
				<MenuItem
					icon={<BiShare />}
					onClick={() => {
						if (navigator.share) {
							navigator
								.share({
									title: "Check out this profile",
									text: "Check out this profile on Twitter",
									url: `https://twitter.com/${userName}`,
								})
								.then(() => console.log("Successful share"))
								.catch((error) => console.log("Error sharing", error));
						} else {
							console.log("Web Share API is not supported in your browser");
							alert("Web Share API is not supported in your browser");
						}
					}}>
					Share Profile
				</MenuItem>
				<MenuItem
					icon={hasCopied ? <FaCheck color="green" /> : <FaCopy color="gray" />}
					onClick={() => onCopy("https://twitter.com/" + userName)}>
					Copy Profile Link
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
