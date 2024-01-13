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
	useOutsideClick,
} from "@yamada-ui/react";
import { useRouter } from "next/navigation";
import { FaAt, FaSearch } from "react-icons/fa";
import Link from "next/link";

export const SearchInput = ({ id }: { id: string }) => {
	const [inputValue, setInputValue] = useState(id);
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(false);
	const [invalidInput, setInvalidInput] = useState(false);
	const [focused, setFocused] = useState(false);
	const [hidden, setHidden] = useState(true);

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

	useEffect(() => {
		if (!hidden) {
			inputRef.current?.focus();
		}
	}, [hidden]);

	useOutsideClick({
		ref: formRef,
		handler: () => setHidden(true),
	});

	return (
		<Box ref={formRef} className="fixed left-2 top-2 w-fit min-w-14">
			<IconButton
				hidden={!hidden}
				onClick={() => {
					setHidden(false);
					inputRef.current?.focus();
				}}
				icon={<FaSearch />}
			/>
			<FormControl
				hidden={hidden}
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
						defaultValue={id}
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
									if (inputValue === id) return;
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
									if (inputValue === id) return;
									setLoading(true);
									setInvalidInput(false);
									router.push(`/profile/${inputValue}`);
								} else {
									setInvalidInput(true);
								}
							}}
							disabled={inputValue.length === 0 || loading}
						/>
					</InputRightElement>
				</InputGroup>
			</FormControl>
		</Box>
	);
};
