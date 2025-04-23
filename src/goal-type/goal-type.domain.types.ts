import { FieldType } from "@/types/enums";
import type {
  GoalType as PrismaGoalType,
  GoalTypeField as PrismaGoalTypeField,
} from "@/generated/prisma";

export default interface GoalTypeModel {
  id: string;
  name: string;
  description: string;
}

export interface GoalTypeDetailedModel {
  id: string;
  name: string;
  description: string;
  goal_type_fields: GoalTypeFieldModel[];
}

export interface GoalTypeFieldModel {
  id: string;
  goal_type_id: string;
  field_name: string;
  field_type: FieldType;
  required: boolean;
  options: string[] | null;
  trackable: boolean | null;
}

export function toGoalTypeDetailedModel(
  prismaModel: PrismaGoalType & { goal_type_fields: PrismaGoalTypeField[] }
): GoalTypeDetailedModel {
  return {
    id: prismaModel.id,
    name: prismaModel.name,
    description: prismaModel.description,
    goal_type_fields: prismaModel.goal_type_fields.map((field) => ({
      id: field.id,
      goal_type_id: field.goal_type_id,
      field_name: field.field_name,
      field_type: field.field_type as FieldType,
      required: field.required,
      options: Array.isArray(field.options)
        ? (field.options as string[])
        : null,
      trackable: field.trackable,
    })),
  };
}

export const toGoalTypeFieldModel = (
  field: PrismaGoalTypeField
): GoalTypeFieldModel => ({
  id: field.id,
  goal_type_id: field.goal_type_id,
  field_name: field.field_name,
  field_type: field.field_type as FieldType,
  required: field.required,
  options: Array.isArray(field.options) ? (field.options as string[]) : null,
  trackable: field.trackable,
});
