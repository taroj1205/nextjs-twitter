import { IconButton, useClipboard } from "@yamada-ui/react";
import { FaCheck, FaCopy } from "react-icons/fa";

export const CopyDMButton = ({ id }: { id: string }) => {
	const { onCopy, hasCopied } = useClipboard();
	return (
		<>
			<IconButton
				icon={hasCopied ? <FaCheck /> : <FaCopy />}
				onClick={() =>
					onCopy("https://twitter.com/messages/compose?recipient_id=" + id)
				}
        variant={"outline"}
        colorScheme={hasCopied ? "green" : "gray"}
				aria-label={hasCopied ? "Copied" : "Copy"}
			/>
		</>
	);
};
