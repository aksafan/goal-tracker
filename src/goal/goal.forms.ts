import { z } from "zod";

export const GoalFieldValueSchema = z.object({
  goal_type_field_id: z.string(),
  value: z.string(),
});

export const GoalRequestFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  goal_type_id: z.string(),
  goal_field_values: z.array(GoalFieldValueSchema),
});

export const UpdateGoalFieldValuesSchema = z.array(GoalFieldValueSchema);

export type GoalRequestFormInput = z.infer<typeof GoalRequestFormSchema>;
export type UpdateGoalFieldValuesInput = z.infer<
  typeof UpdateGoalFieldValuesSchema
>;
