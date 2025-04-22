import { z } from "zod";
import { LoginForm, RegisterForm } from "@/auth/auth.types";
import BadRequestError from "@/errors/badRequest";

const registrationSchema = z
  .object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "'password' must be at least 8 symbols long." })
      .max(100, { message: "'password' must be at most 100 symbols long." }),
    password_confirmation: z.string(),
    name: z.string().min(1, { message: "'name' is required" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "'password' and 'password_confirmation' do not match",
    path: ["password_confirmation"],
  });

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

class AuthValidationService {
  validateRegistration(data: RegisterForm): void {
    const result = registrationSchema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.errors[0];

      throw new BadRequestError({
        message: firstError.message,
        logging: true,
      });
    }
  }

  validateLogin(data: LoginForm): void {
    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.errors[0];

      throw new BadRequestError({
        message: firstError.message,
        logging: true,
      });
    }
  }
}

export const authValidationService = new AuthValidationService();
