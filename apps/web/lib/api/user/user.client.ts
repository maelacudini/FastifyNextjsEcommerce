import { api } from "../client";

const findAllUsers = () => {
    return api.useQuery(
    "get",
    "/user",
  );
}

const findOneUser = (id: string) => {
    return api.useQuery(
    "get",
    "/user/{id}",
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