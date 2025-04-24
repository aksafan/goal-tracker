import { z } from "zod";

export const registrationFormSchema = z
  .object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "'password' must be at least 8 symbols long." })
      .max(64, { message: "'password' must be at most 64 symbols long." }),
    password_confirmation: z.string(),
    name: z.string().min(3, { message: "'name' is required" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "'password' and 'password_confirmation' do not match",
    path: ["password_confirmation"],
  });

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type RegistrationForm = z.infer<typeof registrationFormSchema>;
export type LoginForm = z.infer<typeof loginFormSchema>;
