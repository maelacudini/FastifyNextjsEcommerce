import { paths } from "./api";

export type GetUsersResponse =
  paths["/users"]["get"]["responses"]["200"]["content"]["application/json"];