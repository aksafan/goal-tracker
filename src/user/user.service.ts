import type User from "@/user/user.types";
import type CreateUserForm from "@/dto/CreateUserForm";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

export const createUser = async (userForm: CreateUserForm): Promise<User> => {
  return {
    id: uuid(),
    name: userForm.name,
    email: userForm.email,
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  };
};
