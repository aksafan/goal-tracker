import GoalFieldValueDTO from "@/goal/field-value/field-value.types";

export default interface GoalDTO {
  id: string;
  name: string;
  description: string;
  user_id: string;
  goal_type_id: string;
  created_at: string;
  updated_at: string;
  goal_field_values: GoalFieldValueDTO[];
}
