import { z } from "zod";

export const queryParamsRawSchema = z.object({
  limit: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        return Number.isInteger(num) && num >= 1 && num <= 50;
      },
      {
        message: "Limit must be an integer between 1 and 50",
      }
    )
    .optional(),

  sort: z.string().optional(),
});

export type RawQueryParams = z.infer<typeof queryParamsRawSchema>;

export enum SortingOrder {
  ASC = "asc",
  DESC = "desc",
}

type QueryParams = {
  limit: number;
  sortBy: string;
  sortOrder: SortingOrder;
};

export default QueryParams;

// TODO: remove when other controllers will be implemented and no examples needed anymore
export interface CreateUserQueryParams {
  loginAfterCreate?: boolean;
}
