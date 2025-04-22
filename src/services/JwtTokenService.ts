import jwt, { SignOptions } from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class JwtTokenService {
  private accessSecret: string;
  private refreshSecret: string;
  private accessExpiresIn: SignOptions["expiresIn"];
  private refreshExpiresIn: SignOptions["expiresIn"];

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
    this.accessExpiresIn = JWT_EXPIRES_IN as SignOptions["expiresIn"];
    this.refreshSecret = JWT_REFRESH_SECRET;
    this.refreshExpiresIn = JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"];
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
}

export const jwtTokenService = new JwtTokenService();
