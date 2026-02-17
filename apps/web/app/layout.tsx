import "@/app/_styles/globals.css";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import ClientProviders from "./clientProviders";
import { Geist, Geist_Mono } from "next/font/google";

const GEIST_SANS = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const GEIST_MONO = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Fatify Next.js app setup",
	description: "Created by @maelacudini",
};

export default async function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const locale = await getLocale();

	return (
		<html lang={locale} className="light">
			<body
				suppressHydrationWarning
				className={`${GEIST_SANS.variable} ${GEIST_MONO.variable} antialiased`}
			>
				<NextIntlClientProvider>
					<ClientProviders>
						{children}
					</ClientProviders>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
