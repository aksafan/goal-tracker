import { prisma } from "@/db/prisma";
import {
  NotFoundDomainException,
  ValidationDomainException,
} from "@/errors/domain";
import { GoalRequestFormType, UpdateGoalFieldValuesType } from "./goal.forms";
import { ShortGoalModel } from "@/goal/goal.domain.types";

export const validateGoalExists = async (
  id: string,
  userId: string
): Promise<ShortGoalModel> => {
  const goal = await prisma.goal.findFirst({
    where: { id, user_id: userId },
  });

  if (!goal) {
    throw new NotFoundDomainException({
      message: "Goal not found",
      context: { id },
    });
  }

  return goal;
};

export const validateGoalCreationInput = async (input: GoalRequestFormType) => {
  await validateGoalType(input);
  await validateGoalFieldValues(input);
};

const validateGoalFieldValues = async ({
  goal_type_id,
  goal_field_values,
}: GoalRequestFormType) => {
  const fieldIds = goal_field_values.map((field) => field.goal_type_field_id);
  const matchingFields = await prisma.goalTypeField.findMany({
    where: {
      id: { in: fieldIds },
      goal_type_id: goal_type_id,
    },
  });

  if (matchingFields.length !== fieldIds.length) {
    throw new ValidationDomainException({
      context: {
        goal_field_values: [
          "Some goal field values refer to invalid or mismatched fields.",
        ],
      },
    });
  }
};

const validateGoalType = async ({ goal_type_id }: GoalRequestFormType) => {
  const goalType = await prisma.goalType.findUnique({
    where: { id: goal_type_id },
  });

  if (!goalType) {
    throw new NotFoundDomainException({
      message: "Goal type not found",
    });
  }
};

export const validateGoalFieldValuesUpdateInput = async (
  id: string,
  userId: string,
  values: UpdateGoalFieldValuesType
) => {
  const goal: ShortGoalModel = await validateGoalExists(id, userId);
  await validateFieldsMatchGoalType(goal.goal_type_id, values);
};

const validateFieldsMatchGoalType = async (
  goalTypeId: string,
  values: UpdateGoalFieldValuesType
) => {
  const goalTypeFields = await prisma.goalTypeField.findMany({
    where: { goal_type_id: goalTypeId },
  });

  const allowedFieldIds = new Set(goalTypeFields.map((field) => field.id));
  for (const f of values) {
    if (!allowedFieldIds.has(f.goal_type_field_id)) {
      throw new ValidationDomainException({
        context: { fieldId: [`Invalid field ID: ${f.goal_type_field_id}`] },
      });
    }
  }
};
