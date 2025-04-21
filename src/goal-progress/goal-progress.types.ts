export default interface GoalProgressDTO {
  id: string;
  goal_id: string;
  goal_type_field_id: string;
  user_id: string;
  progress_value: number;
  created_at: string;
}
