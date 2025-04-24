import { NotFoundDomainException } from "@/errors/domain";
import { DailyQuestFormType } from "@/daily-quest/daily-quest.forms";
import { prisma } from "@/db/prisma";

export const validateDailyQuestForUpdate = async (
  dailyQuestId: string,
  userId: string,
  form: DailyQuestFormType
): Promise<void> => {
  await validateGoalExists(userId, form);
  await validateDailyQuestExists(dailyQuestId, userId);
};

export const validateGoalExists = async (
  userId: string,
  form: DailyQuestFormType
): Promise<void> => {
  if (form.goal_id) {
    const goal = await prisma.goal.findFirst({
      where: { id: form.goal_id, user_id: userId },
    });

    if (!goal) {
      throw new NotFoundDomainException({
        message: "Associated goal not found or does not belong to the user",
      });
    }
  }
};

export const validateDailyQuestExists = async (
  id: string,
  userId: string
): Promise<void> => {
  const existing = await prisma.dailyQuest.findFirst({
    where: { id, user_id: userId },
  });

  if (!existing) {
    throw new NotFoundDomainException({
      message: "Daily quest not found",
    });
  }
};
