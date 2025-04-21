import { prisma } from "@/services/prisma";
import bcrypt from "bcryptjs";

class UserService {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(name: string, email: string, passwordHash: string) {
    return prisma.user.create({ data: { name, email, password: passwordHash } });
  }

  async comparePasswords(plainPassword: string, hashedPassword?: string) {
    return hashedPassword ? bcrypt.compare(plainPassword, hashedPassword) : false;
  }
}

export const userService = new UserService();