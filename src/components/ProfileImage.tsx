"use client";
import {
	Button,
	Image,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
  Center,
  Link,
} from "@yamada-ui/react";
import { Twemoji } from "react-emoji-render";
export const ProfileImage = ({ src, alt }: { src: string; alt: string }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Image
				onClick={onOpen}
				width={100}
				height={100}
				src={src}
				alt={alt}
				cursor={"zoom-in"}
				className="rounded-full border border-gray-300 data-[mode=dark]:border-gray-600 -mt-16 ml-4"
			/>
			<Modal isOpen={isOpen} onClose={onClose} size={"80%"}>
				<ModalHeader>
					<Twemoji className="emoji text-xl font-bold" text={alt} />
				</ModalHeader>

				<ModalBody>
					<Center w={"100%"}>
						<Link isExternal href={src}><Image src={src} alt={alt} maxH={"90svh"} /></Link>
					</Center>
				</ModalBody>
			</Modal>
		</>
	);
};
