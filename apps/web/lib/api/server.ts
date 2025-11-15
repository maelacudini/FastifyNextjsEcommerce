import { paths } from "@/packages/types/api";
import createFetchClient from "openapi-fetch";

export const fetchClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL
});