export interface GoalFieldValueModel {
  id: string;
  goal_type_field_id: string;
  goal_id: string;
  user_id: string;
  value: string;
}

export interface GoalModel {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  goal_type_id: string;
  created_at: Date;
  updated_at: Date;
  goal_field_values: GoalFieldValueModel[];
}
