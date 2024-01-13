"use client";
import React, { useEffect, useRef, useState } from "react";
import {
	Box,
	CircleProgress,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	IconButton,
} from "@yamada-ui/react";
import { useRouter } from "next/navigation";
import { FaAt, FaSearch } from "react-icons/fa";

export const SearchProfile = () => {
	const [inputValue, setInputValue] = useState("");
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(false);
	const [invalidInput, setInvalidInput] = useState(false);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "k") {
				inputRef.current?.focus();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<Box>
			<FormControl
				errorMessage="An user handle is required."
				isInvalid={invalidInput}>
				<InputGroup>
					<InputLeftElement>
						{loading ? <CircleProgress size={5} isAnimation /> : <FaAt />}
					</InputLeftElement>
					<Input
						ref={inputRef}
						className={`!pr-2 md:!pr-[${
							focused ? "var(--ui-sizes-12)" : "var(--ui-sizes-20)"
						}]`}
						placeholder={`Search @user...`}
						type="text"
						required
						autoFocus
						onChange={(e) => {
							setInputValue(e.target.value);
						}}
						onFocus={() => {
							setFocused(true);
						}}
						onBlur={() => {
							setFocused(false);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								if (inputValue.length > 0) {
									setLoading(true);
									setInvalidInput(false);
									router.push(`/profile/${inputValue}`);
								} else {
									setInvalidInput(true);
								}
							} else if (e.key === "Escape") {
								inputRef.current?.blur();
							}
						}}
					/>
					<InputRightElement isClick>
						<IconButton
							icon={<FaSearch />}
							onClick={() => {
								if (inputValue.length > 0) {
									setLoading(true);
									setInvalidInput(false);
									router.push(`/profile/${inputValue}`);
								} else {
									setInvalidInput(true);
								}
							}}
						/>
					</InputRightElement>
				</InputGroup>
			</FormControl>
		</Box>
	);
};
