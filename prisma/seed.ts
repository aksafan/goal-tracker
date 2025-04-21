import { seedGoalTypes } from "@/db/seeds/goal-type";
import { seedUsers } from "@/db/seeds/user";
import { seedGoals } from "@/db/seeds/goal";
import { seedGoalProgress } from "@/db/seeds/goal-progress";
import { seedDailyQuests } from "@/db/seeds/daily-quest";
import { softReset as softResetModels } from "@/db/seeds/soft-reset";

const softReset = async (): Promise<void> => {
  console.log("🧹 Starting soft reset...");

  await softResetModels();
  console.log("✅ Soft reset complete.");
};

const seed = async (): Promise<void> => {
  console.log("🌱 Starting DB seeding...");

  await seedGoalTypes();
  console.log("✅ Seeded goal types and fields");

  await seedUsers();
  console.log("✅ Seeded users and refresh tokens");

  await seedGoals();
  console.log("✅ Seeded goals, field values, and board images");

  await seedGoalProgress();
  console.log("✅ Seeded goal progress records");

  await seedDailyQuests();
  console.log("✅ Seeded daily quests, completions, and suggestions");

  console.log("✅ All seed data inserted successfully.");
};

async function run() {
  await softReset();
  await seed();
  console.log("🚀 Done. DB is reset and seeded.");
}

run().catch((e) => {
  console.error("❌ Failed to reset and seed:", e);
  process.exit(1);
});
