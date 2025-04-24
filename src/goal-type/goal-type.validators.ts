import { prisma } from "@/db/prisma";
import { NotFoundDomainException } from "@/errors/domain";
import GoalTypeModel from "@/goal-type/goal-type.domain.types";

export const validateGoalTypeExists = async (
  id: string
): Promise<GoalTypeModel> => {
  const goalType = await prisma.goalType.findFirst({
    where: { id },
  });

  if (!goalType) {
    throw new NotFoundDomainException({
      message: "Goal type not found",
      context: { id },
    });
  }

  return goalType;
};
