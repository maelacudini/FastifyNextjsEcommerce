// TODO: EVALUATE GETTING TYPES FROM FOLDER INSIDE WEB INSTEAD OF PACKAGES, DO WE REALLY NEED TO SHARE TYPES
// AND KEEP THEM IN PACKAGES? OR CAN I GENERATE TYPES FROM API (SERVER) AND KEEP THE GENERATED TYPES INSIDE WEB (FRONTEND/NEXT.JS)?

import { paths } from "@/types/api";
import createFetchClient from "openapi-fetch";

export const fetchServer = createFetchClient<paths>({
  baseUrl: process.env.API_INTERNAL_URL
});