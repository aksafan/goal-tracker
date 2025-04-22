import type User from "@/user/user.types";
import type CreateUserForm from "@/dto/CreateUserForm";
import { v4 as uuid } from "uuid";
import { prisma } from "@/services/prisma";
import bcrypt from "bcryptjs";

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

class UserService {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(name: string, email: string, passwordHash: string) {
    return prisma.user.create({
      data: { name, email, password: passwordHash },
    });
  }

  async comparePasswords(plainPassword: string, hashedPassword?: string) {
    return hashedPassword
      ? bcrypt.compare(plainPassword, hashedPassword)
      : false;
  }
}

export const userService = new UserService();
