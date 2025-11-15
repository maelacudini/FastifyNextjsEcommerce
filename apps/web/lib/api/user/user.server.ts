import { fetchClient } from "../server";

const findAllUsers = async () => {
  return await fetchClient.GET("/users");
}

export {
  findAllUsers
}