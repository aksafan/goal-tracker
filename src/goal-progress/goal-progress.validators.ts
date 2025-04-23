import { prisma } from "@/db/prisma";
import {
  NotFoundDomainException,
  ValidationDomainException,
} from "@/errors/domain";
import { CreateGoalProgressFormType } from "@/goal-progress/goal-progress.forms";
import { ShortGoalModel } from "@/goal/goal.domain.types";

export const validateGoalProgressCreationInput = async (
  goalId: string,
  userId: string,
  form: CreateGoalProgressFormType
) => {
  const goal: ShortGoalModel = await validateGoalOwnership(goalId, userId);
  await validateGoalTypeField(goal, form);
};

const validateGoalOwnership = async (
  goalId: string,
  userId: string
): Promise<ShortGoalModel> => {
  const goal = await prisma.goal.findFirst({
    where: { id: goalId, user_id: userId },
  });

  if (!goal) {
    throw new NotFoundDomainException({
      message: "Goal not found or not accessible",
    });
  }

  return goal;
};

const validateGoalTypeField = async (
  { goal_type_id }: ShortGoalModel,
  { goal_type_field_id }: CreateGoalProgressFormType
) => {
  const isFieldValid = await prisma.goalTypeField.findFirst({
    where: {
      id: goal_type_field_id,
      goal_type_id: goal_type_id,
    },
  });

  if (!isFieldValid) {
    throw new ValidationDomainException({
      message: "goal_type_field_id does not match goal's type",
      context: {
        goal_type_field_id: goal_type_field_id,
      },
    });
  }
};
