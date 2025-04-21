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

export interface GoalFieldValueDTO {
  id: string;
  goal_type_field_id: string;
  goal_id: string;
  user_id: string;
  value: string;
}
