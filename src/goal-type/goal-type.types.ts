import GoalTypeFieldDTO from "@/goal-type/field/field.types";

export default interface GoalTypeDTO {
  id: string;
  name: string;
  description: string;
  goal_type_fields: GoalTypeFieldDTO[];
}
