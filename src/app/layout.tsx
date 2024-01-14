import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Settings } from "@/components/Settings";
import { Box, ColorModeScript } from "@yamada-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Twitter Profile Viewer",
	description: "View your Twitter Profile",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			data-mode="dark"
			style={{colorScheme: 'dark'}}
			data-theme="base">
			<body className={`${inter.className} ui-dark`}>
				<Providers>
					<ColorModeScript
						type="cookie"
						nonce="testing"
						initialColorMode="system"
					/>
					<Box className="min-h-svh">
						<Settings />
						{children}
					</Box>
				</Providers>
			</body>
		</html>
	);
}
