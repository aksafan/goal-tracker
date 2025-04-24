import QueryParams, { RawQueryParams, SortingOrder } from "@/types/queryParams";

export const parseQueryParams = (query: RawQueryParams): QueryParams => {
  const limitRaw = query.limit ?? "10";
  const limit = parseInt(limitRaw, 10);

  const sortRaw = query.sort ?? "created_at";
  const sortField = sortRaw.replace(/^-/, "");
  const sortOrder = sortRaw.startsWith("-")
    ? SortingOrder.DESC
    : SortingOrder.ASC;

  const date = query.date ? new Date(query.date) : undefined;

  return {
    limit,
    sortBy: sortField,
    sortOrder,
    date,
  };
};
