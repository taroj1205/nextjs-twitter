"use client";
import {
  Box,
	FormControl,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	VStack,
	useColorMode,
	useDisclosure,
} from "@yamada-ui/react";
import { FaCog } from "react-icons/fa";

export const Settings = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { internalColorMode, changeColorMode } = useColorMode();
	return (
		<>
			<Box z={10} position="fixed" top={2} right={2}>
				<IconButton icon={<FaCog />} onClick={onOpen} />
			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
				<ModalHeader>Settings</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack>
						<FormControl label="Select theme">
							<RadioGroup
								defaultValue={internalColorMode}
								onChange={changeColorMode}>
								<Radio value="light">Light</Radio>
								<Radio value="dark">Dark</Radio>
								<Radio value="system">System</Radio>
							</RadioGroup>
						</FormControl>
					</VStack>
				</ModalBody>
			</Modal>
		</>
	);
};
