import type User from "@/user/user.types";
import type CreateUserForm from "@/dto/CreateUserForm";
import { v4 as uuid } from "uuid";
import { prisma } from "@/db/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prismaErrorCodes from "@/types/prismaErrorCodes";
import { logPrismaKnownError } from "@/utils/logger";
import {
  ForeignKeyConstraintDomainException,
  UniqueConstraintDomainException,
  UnknownDomainException,
} from "@/errors/domain";

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
    try {
      return await prisma.user.create({
        data: { name, email, password: passwordHash },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === prismaErrorCodes.UNIQUE_CONSTRAINT_FAILED_CODE) {
          logPrismaKnownError(e);

          throw new UniqueConstraintDomainException({
            message: "A new user cannot be created with this email",
          });
        }

        if (e.code === prismaErrorCodes.FOREIGN_KEY_CONSTRAINT_FAILED_CODE) {
          logPrismaKnownError(e);

          throw new ForeignKeyConstraintDomainException({
            message: "A new user cannot be created with this email",
          });
        }

        throw new UnknownDomainException({
          message: "Could not create user",
          context: { e },
        });
      }
    }
  }
}

export const userService = new UserService();
