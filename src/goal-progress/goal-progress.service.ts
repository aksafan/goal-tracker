// import { prisma } from "@/db/prisma";
// import { GoalProgressModel } from "@/goal/goal.types";

export default class GoalProgressService {
  // findAll = async (userId: string): Promise<GoalProgressModel[]> => {
  //   return prisma.goalProgress.findMany({
  //     where: { user_id: userId },
  //     orderBy: { created_at: "desc" },
  //   });
  // };
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
}
