import { Frequency } from "@/types/enums";

export default interface DailyQuestDTO {
  id: string;
  user_id: string;
  goal_id?: string;
  suggestion_id?: string;
  title: string;
  icon: string;
  is_daily: boolean;
  frequency: Frequency[];
  created_at: string;
  updated_at: string;
}
