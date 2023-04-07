import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationResponse<T> {
  @ApiPropertyOptional()
  total?: number = 0;
  @ApiPropertyOptional()
  pages?: number = 0;
  @ApiPropertyOptional()
  previous?: boolean = false;
  @ApiPropertyOptional()
  next?: boolean = false;
  @ApiPropertyOptional()
  data?: T[] = [];
}
