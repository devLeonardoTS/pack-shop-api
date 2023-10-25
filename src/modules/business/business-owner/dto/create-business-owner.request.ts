import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateBusinessOwnerRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  fullName: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  businessId?: number;
}
