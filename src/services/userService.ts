import CreateUserDto from "../dtos/CreateUser.dto";
import { User } from "../types/response";
import { randomInt } from "node:crypto";

export const createUser = async (userForm: CreateUserDto): Promise<User> => {
  // Do something with user, e.g. save to DB

  return {
    id: randomInt(123),
    username: userForm.username,
    email: userForm.email,
  };
};
