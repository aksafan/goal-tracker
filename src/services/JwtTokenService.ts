import jwt from "jsonwebtoken";
import ms, { StringValue } from "ms";

type JwtPayload = {
  userId: string;
};

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export class JwtTokenService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiresIn: StringValue;
  private readonly refreshExpiresIn: StringValue;

  constructor() {
    const {
      JWT_SECRET,
      JWT_EXPIRES_IN,
      JWT_REFRESH_SECRET,
      JWT_REFRESH_EXPIRES_IN,
    } = process.env;

    if (
      !JWT_SECRET ||
      !JWT_EXPIRES_IN ||
      !JWT_REFRESH_SECRET ||
      !JWT_REFRESH_EXPIRES_IN
    ) {
      throw new Error("Missing one or more JWT-related environment variables.");
    }

    this.accessSecret = JWT_SECRET;
    this.accessExpiresIn = (JWT_EXPIRES_IN || "15m") as StringValue;
    this.refreshSecret = JWT_REFRESH_SECRET;
    this.refreshExpiresIn = (JWT_REFRESH_EXPIRES_IN || "24h") as StringValue;
  }

  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpiresIn,
    });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
    });
  }

  generateTokenPair(payload: JwtPayload): TokenPair {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, this.accessSecret) as JwtPayload;
  }

  verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, this.refreshSecret) as JwtPayload;
  }

  getRefreshTokenExpirationDate(): Date {
    const expiresInMs = ms(this.refreshExpiresIn);

    return new Date(Date.now() + expiresInMs);
  }
}

export const jwtTokenService = new JwtTokenService();
