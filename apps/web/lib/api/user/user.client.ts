import { api } from "../client";

const findAllUsers = () => {
    return api.useQuery(
    "get",
    "/users",
  );
}

const findOneUser = (id: string) => {
    return api.useQuery(
    "get",
    "/users/{id}",
    {
      params: {
        path: { 
          id: id
        }
    },
    }
  );
}

export {
  findAllUsers,
  findOneUser
}