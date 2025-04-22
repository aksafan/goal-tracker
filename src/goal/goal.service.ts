import { prisma } from "@/db/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  ForeignKeyConstraintDomainException,
  NotFoundDomainException,
  UniqueConstraintDomainException,
  UnknownDomainException,
} from "@/errors/domain";
import { GoalModel } from "@/goal/goal.domain.types";
import QueryParams from "@/types/queryParams";
import {
  GoalRequestFormType,
  UpdateGoalFieldValuesType,
  UpdateGoalFormType,
} from "@/goal/goal.forms";
import { logPrismaKnownError } from "@/utils/logger";
import {
  validateGoalCreationInput,
  validateGoalExists,
  validateGoalFieldValuesUpdateInput,
} from "@/goal/goal.validators";

export default class GoalService {
  findAll = async (
    userId: string,
    { limit, sortBy, sortOrder }: QueryParams
  ): Promise<GoalModel[]> => {
    return prisma.goal.findMany({
      where: { user_id: userId },
      include: { goal_field_values: true },
      orderBy: { [sortBy]: sortOrder },
      take: limit,
    });
  };

  findById = async (id: string, userId: string): Promise<GoalModel> => {
    try {
      return await prisma.goal.findFirstOrThrow({
        where: { id, user_id: userId },
        include: { goal_field_values: true },
      });
    } catch (e: unknown) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          logPrismaKnownError(e);

          throw new NotFoundDomainException({
            message: "There is no goal with the given data",
          });
        }

        throw new UnknownDomainException({
          message: "There is no goal with the given data",
          context: { e },
        });
      }

      throw e;
    }
  };

  create = async (
    userId: string,
    form: GoalRequestFormType
  ): Promise<GoalModel> => {
    await validateGoalCreationInput(form);

    try {
      return await prisma.goal.create({
        data: {
          name: form.name,
          description: form.description,
          goal_type_id: form.goal_type_id,
          user_id: userId,
          goal_field_values: {
            create: form.goal_field_values.map((f) => ({
              goal_type_field_id: f.goal_type_field_id,
              value: f.value,
              user_id: userId,
            })),
          },
        },
        include: {
          goal_field_values: true,
        },
      });
    } catch (e: unknown) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          logPrismaKnownError(e);

          throw new UniqueConstraintDomainException({
            message: "A new goal cannot be created with this email",
          });
        }
        if (e.code === "P2003") {
          logPrismaKnownError(e);

          throw new ForeignKeyConstraintDomainException({
            message: "A new goal cannot be created with this email",
          });
        }

        throw new UnknownDomainException({
          message: "There is no goal with the given data",
          context: { e },
        });
      }

      throw e;
    }
  };

  update = async (
    id: string,
    userId: string,
    form: UpdateGoalFormType
  ): Promise<GoalModel> => {
    await validateGoalExists(id, userId);

    try {
      return await prisma.goal.update({
        where: { id },
        data: {
          name: form.name,
          description: form.description,
        },
        include: {
          goal_field_values: true,
        },
      });
    } catch (e: unknown) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new UnknownDomainException({
          message: "Failed to update goal",
          context: { e },
        });
      }

      throw e;
    }
  };

  delete = async (id: string, userId: string): Promise<void> => {
    await validateGoalExists(id, userId);

    await prisma.goal.delete({
      where: { id },
    });
  };

  updateFieldValues = async (
    goalId: string,
    userId: string,
    values: UpdateGoalFieldValuesType
  ): Promise<GoalModel> => {
    await validateGoalFieldValuesUpdateInput(goalId, userId, values);

    return prisma.$transaction(async (tx) => {
      const updateFieldValues = values.map((f) =>
        tx.goalFieldValue.updateMany({
          where: {
            goal_id: goalId,
            goal_type_field_id: f.goal_type_field_id,
            user_id: userId,
          },
          data: {
            value: f.value,
          },
        })
      );

      await Promise.all(updateFieldValues);

      const goalAfterUpdate = await tx.goal.findUnique({
        where: { id: goalId },
        include: { goal_field_values: true },
      });

      if (!goalAfterUpdate) {
        throw new UnknownDomainException({
          message: "Goal not found",
          context: { goalId },
        });
      }

      return goalAfterUpdate;
    });
  };
}
