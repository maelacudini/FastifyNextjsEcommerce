import { fetchServer } from "../server";

const findAllUsers = async () => {
  return await fetchServer.GET("/users");
}

export {
  findAllUsers
}