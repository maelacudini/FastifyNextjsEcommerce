import createClient from "openapi-react-query";
import { fetchClient } from "./server";

export const api = createClient(fetchClient);
