import "@/app/_styles/globals.css";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import ClientProviders from "./clientProviders";
import { Geist, Figtree } from "next/font/google";

const FIGTREE = Figtree({
	subsets: ["latin"],
	display: 'swap',
	variable:'--font-figtree'
});

const GEIST_SANS = Geist({
	subsets: ["latin"],
	display: 'swap',
	variable: "--font-geist",
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
		<html lang={locale} className={`${GEIST_SANS.variable} ${FIGTREE.variable} light`}>
			<body
				suppressHydrationWarning
				className={`antialiased`}
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
