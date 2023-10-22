import { Transform } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationQuery {
  @IsOptional()
  @Transform(({ value }) => Math.abs(Number.parseInt(value) || 1))
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }) => Math.abs(Number.parseInt(value) || 10))
  @IsNumber()
  @Min(1)
  limit?: number;
}
