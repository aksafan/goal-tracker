import { ZodError } from "zod";

export type FlattenedFieldErrors = ReturnType<
  ZodError["flatten"]
>["fieldErrors"];
