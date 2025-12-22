import createClient from "openapi-react-query";
import createFetchClient from "openapi-fetch";
import { paths } from "@/types/api";

export const fetchClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL
});

export const api = createClient(fetchClient);
