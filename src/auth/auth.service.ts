import { userService } from "@/user/user.service";
import { jwtTokenService } from "@/services/JwtTokenService";
import {
  UnauthenticatedError,
  UnauthorizedError,
  UnprocessableEntityError,
} from "@/errors";
import {
  LoginForm,
  loginFormSchema,
  RegistrationForm,
  registrationFormSchema,
} from "./auth.forms";
import {
  validateExistingUser,
  validateUserPassword,
} from "./auth.validators";
import bcrypt from "bcryptjs";

export class AuthService {
  async register(data: RegistrationForm) {
    const result = registrationFormSchema.safeParse(data);

    if (!result.success) {
      throw new UnprocessableEntityError({
        // will work after merge of goals
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { email, password, name } = data;

    await validateExistingUser(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser(name, email, hashedPassword);
    const tokenPair = jwtTokenService.generateTokenPair({ userId: newUser.id });

    return {
      access_token: tokenPair.accessToken,
      refresh_token: tokenPair.refreshToken,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        created_at: newUser.created_at,
      },
    };
  }

  async login(data: LoginForm) {
    const result = loginFormSchema.safeParse(data);

    if (!result.success) {
      throw new UnprocessableEntityError({
        // will work after merge of goals
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { email, password } = data;

    const user = await userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedError({ message: "Invalid email or password" });
    }
    await validateUserPassword(password, user.password);

    const { accessToken, refreshToken } = jwtTokenService.generateTokenPair({
      userId: user.id,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(token: string) {
    if (!token) {
      throw new UnauthenticatedError({ message: "Missing refresh token" });
    }

    let payload;
    try {
      payload = jwtTokenService.verifyRefreshToken(token);
    } catch {
      throw new UnauthenticatedError({
        message: "Invalid or expired refresh token",
      });
    }

    const accessToken = jwtTokenService.generateAccessToken({
      userId: payload.userId,
    });

    return { accessToken };
  }
}
