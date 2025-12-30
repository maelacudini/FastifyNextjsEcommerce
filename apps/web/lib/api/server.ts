import { paths } from "@/types/api";
import createFetchClient from "openapi-fetch";

export const fetchServer = createFetchClient<paths>({
  baseUrl: process.env.API_INTERNAL_URL
});