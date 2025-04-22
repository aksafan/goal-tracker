import { prisma } from "@/db/prisma";

export const softReset = async (): Promise<void> => {
  await prisma.dailyQuestCompletion.deleteMany();
  await prisma.dailyQuest.deleteMany();
  await prisma.dailyQuestSuggestion.deleteMany();

  await prisma.goalProgress.deleteMany();
  await prisma.goalBoardImage.deleteMany();
  await prisma.goalFieldValue.deleteMany();
  await prisma.goal.deleteMany();

  await prisma.goalTypeField.deleteMany();
  await prisma.goalType.deleteMany();

  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
};
