import { Frequency } from "@/types/enums";
import { DailyQuestModel } from "@/daily-quest/daily-quest.domain.types";

export interface DailyQuestResponse {
  id: string;
  user_id: string;
  goal_id: string | null;
  suggestion_id: string | null;
  title: string;
  icon: string;
  frequency: Frequency[];
  created_at: string;
  updated_at: string;
}

export const toDailyQuestResponse = (
  model: DailyQuestModel
): DailyQuestResponse => ({
  id: model.id,
  user_id: model.user_id,
  goal_id: model.goal_id,
  suggestion_id: model.goal_id,
  title: model.title,
  icon: model.icon,
  frequency: model.frequency,
  created_at: model.created_at.toISOString(),
  updated_at: model.updated_at.toISOString(),
});

export const toDailyQuestResponses = (
  models: DailyQuestModel[]
): DailyQuestResponse[] => models.map(toDailyQuestResponse);
