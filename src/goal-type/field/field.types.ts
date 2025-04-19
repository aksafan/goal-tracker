import { FieldType } from "@/types/enums";

export default interface GoalTypeFieldDTO {
  id: string;
  field_name: string;
  field_type: FieldType;
  required: boolean;
  options?: string[];
  trackable: boolean;
}
