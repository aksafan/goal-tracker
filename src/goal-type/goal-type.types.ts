import { FieldType } from "@/types/enums";

export default interface GoalTypeDTO {
  id: string;
  name: string;
  description: string;
  goal_type_fields: GoalTypeFieldDTO[];
}

export interface GoalTypeFieldDTO {
  id: string;
  field_name: string;
  field_type: FieldType;
  required: boolean;
  options?: string[];
  trackable: boolean;
}
