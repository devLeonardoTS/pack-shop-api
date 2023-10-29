import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateTagRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return;
    }
    return String(value)
      .toLowerCase()
      .split(";")
      .map((value) => value.trim());
  })
  @IsArray()
  @IsString({ each: true })
  @MaxLength(255, { each: true })
  names?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  hits?: number;
}
