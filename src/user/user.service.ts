import type User from "@/user/user.types";
import type CreateUserForm from "@/dto/CreateUserForm";
import { v4 as uuid } from "uuid";

// TODO: remove or update when other controllers will be implemented and no examples needed anymore
export const createUser = async (userForm: CreateUserForm): Promise<User> => {
  return {
    id: uuid(),
    name: userForm.name,
    email: userForm.email,
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  };
};
