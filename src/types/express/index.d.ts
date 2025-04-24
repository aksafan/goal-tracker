import type { QueryParams } from "@/types/query-params";

declare global {
  namespace Express {
    interface Request {
      queryParams?: QueryParams;
    }
  }
}
