"use client";
import {
	UIProvider,
	createColorModeManager,
} from "@yamada-ui/react";
import { ReactNode } from "react";


export const Providers = ({ children }: { children: ReactNode }) => {
	const colorModeManager = createColorModeManager("cookie");
	return (
		<UIProvider colorModeManager={colorModeManager}>
				{children}
		</UIProvider>
	);
};