import { prisma } from "@/db/prisma";

export const seedGoalProgress = async (): Promise<void> => {
  const users = await prisma.user.findMany();

  for (const user of users) {
    const goals = await prisma.goal.findMany({
      where: { user_id: user.id },
      include: {
        goal_type: { include: { fields: true } },
      },
    });

    for (const goal of goals) {
      const trackableFields = goal.goal_type.fields.filter((f) => f.trackable);

      for (const field of trackableFields) {
        const progressRecords = Array.from(
          { length: getRandomInt(1, 3) },
          (_, i) => ({
            goal_id: goal.id,
            goal_type_field_id: field.id,
            user_id: user.id,
            progress_value: getRandomInt(1, 10),
            created_at: daysAgo(getRandomInt(1, 14)),
          })
        );

        await prisma.goalProgress.createMany({ data: progressRecords });
      }
    }
  }
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};
