"use server";

import { cookies } from "next/headers";
import { COOKIE_NAME, DEFAULT_LOCALE } from "./const";
import { LocaleType } from "./types";

export const getUserLocale = async () => {
	return (await cookies()).get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
};

export const setUserLocale = async (locale: LocaleType) => {
	(await cookies()).set(COOKIE_NAME, locale);
};