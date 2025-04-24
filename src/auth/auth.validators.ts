import { UnauthorizedError, UnprocessableEntityError } from "@/errors/http";
import { userService } from "@/user/user.service";
import bcrypt from "bcryptjs";

export const validateExistingUser = async (email: string) => {
  const existingUser = await userService.findUserByEmail(email);

  if (existingUser) {
    throw new UnprocessableEntityError({
      message: "User already exists",
      errors: {
        email: ["User with this email already exists"],
      },
    });
  }
};

export const validateUserPassword = async (
  formValue: string,
  userPassword: string
) => {
    const isMatch =  bcrypt.compare(formValue, userPassword);

  if (!isMatch) {
    throw new UnauthorizedError({ message: "Invalid email or password" });
  }
};
