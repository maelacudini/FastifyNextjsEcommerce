import { Geist, Geist_Mono } from "next/font/google";

const GEIST_SANS = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const GEIST_MONO = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export { 
	GEIST_SANS, 
	GEIST_MONO
};