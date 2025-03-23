import { randomInt } from "node:crypto";
import User from "../schema/user";
import CreateUserForm from "../dtos/CreateUserForm";
import bcrypt from "bcryptjs";

export const createUser = async (userForm: CreateUserForm): Promise<User> => {
  // Do something with user, e.g. save to DB

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(userForm.password, salt);

  return {
    id: randomInt(123),
    username: userForm.username,
    email: userForm.email,
    password: password,
    created_at: Date.now(),
    updated_at: Date.now(),
  };
};
