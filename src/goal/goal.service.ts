import { prisma } from "@/db/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  NotFoundDomainException,
  UnknownDomainException,
} from "@/errors/domain";
import { GoalModel } from "@/goal/goal.domain.types";

export default class GoalService {
  findAll = async (
    userId: string,
    options: { limit: number; sort: string }
  ): Promise<GoalModel[]> => {
    return prisma.goal.findMany({
      where: { user_id: userId },
      include: { goal_field_values: true },
      orderBy: { created_at: "desc" },
      take: options.limit,
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

  //
  // create = async (data: any, userId: string): Promise<GoalDTO> => {
  //   try {
  //     await prisma.goal.create({
  //       data: {
  //         name: data.name,
  //         description: data.description,
  //         goal_type_id: data.goal_type_id,
  //         user_id: userId,
  //         field_values: {
  //           create: data.goal_field_values.map((f: any) => ({
  //             goal_type_field_id: f.goal_type_field_id,
  //             value: f.value,
  //             user_id: userId,
  //           })),
  //         },
  //       },
  //       include: { field_values: true },
  //     });
  //   } catch (e: unknown) {
  //     if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
  //       // The .code property can be accessed in a type-safe manner
  //       if (e.code === "P2002") {
  //         console.log(
  //           "There is a unique constraint violation, a new goal cannot be created with this email"
  //         );
  //       }
  //     }
  //
  //     throw new DomainException(e);
  //   }
  // }
  //
  // update = async (id: string, data: any): Promise<GoalDTO> => {
  //   await prisma.goal.update({
  //     where: { id },
  //     data: {
  //       name: data.name,
  //       description: data.description,
  //     },
  //     include: { field_values: true },
  //   });
  // }
  //
  // remove = async (id: string): Promise<void> => {
  //   await prisma.goal.delete({ where: { id } });
  // }
  //
  // updateFieldValues = async (
  //   goalId: string,
  //   values: GoalFieldValueDTO[],
  //   userId: string
  // ) => {
  //   const updates = values.map((v) =>
  //     prisma.goalFieldValue.upsert({
  //       where: { id: v.id },
  //       update: { value: v.value },
  //       create: {
  //         value: v.value,
  //         goal_id: goalId,
  //         user_id: userId,
  //         goal_type_field_id: v.goal_type_field_id,
  //       },
  //     })
  //   );
  //
  //   await Promise.all(updates);
  // }
  //
  // getProgress = async (goalId: string, userId: string) => {
  //   await prisma.goalProgress.findMany({
  //     where: { goal_id: goalId, user_id: userId },
  //   });
  // }
  //
  // addProgress = async (goalId: string, data: any, userId: string) => {
  //   await prisma.goalProgress.create({
  //     data: {
  //       goal_id: goalId,
  //       user_id: userId,
  //       goal_type_field_id: data.goal_type_field_id,
  //       progress_value: data.progress_value,
  //     },
  //   });
  // }
}
