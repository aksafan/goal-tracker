import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import "dotenv/config";

const { SEED_USER_PASSWORD = "" } = process.env;

type SeedUser = {
  name: string;
  email: string;
};

export const seedUsers = async (): Promise<void> => {
  const now = new Date();
  const passwordHash = await bcrypt.hash(SEED_USER_PASSWORD, 10);

  const usersData: SeedUser[] = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Carol", email: "carol@example.com" },
  ];

  const users = [];

  for (const userData of usersData) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: passwordHash,
      },
    });
    users.push(user);
  }

  await prisma.refreshToken.createMany({
    data: users.map((user) => ({
      user_id: user.id,
      token: uuid(),
      revoked: false,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      created_at: now,
    })),
    skipDuplicates: true,
  });
};
