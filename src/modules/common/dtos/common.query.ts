import { PaginationQuery } from "./pagination.query";

export class CommonQuery<T> {
  pagination: PaginationQuery;
  filters: Partial<T>;
  orderBy: any;
}
