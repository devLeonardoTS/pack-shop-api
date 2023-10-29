import { Type } from "class-transformer";
import { PaginationQuery } from "./pagination.query";

export class CommonQuery<T> {
  @Type(() => PaginationQuery)
  pagination?: PaginationQuery;
  filters?: Partial<T & Record<string, any>>;
  orderBy?: any;
  include?: any;
}
