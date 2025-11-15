import { LocaleType } from "./types";

export const COOKIE_NAME = "NEXT_LOCALE";
export const LOCALES = ["en", "it"] as const;
export const DEFAULT_LOCALE: LocaleType = "en";