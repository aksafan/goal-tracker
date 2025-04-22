import bcrypt from "bcryptjs";

class PasswordService {
  async compare(plain: string, hash?: string): Promise<boolean> {
    return hash ? bcrypt.compare(plain, hash) : false;
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export const passwordService = new PasswordService();
