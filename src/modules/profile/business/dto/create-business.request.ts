import { EBusinessType } from "@src/modules/business-type/enums/business-type.enum";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateBusinessRequest {
  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsEnum(EBusinessType)
  businessType: EBusinessType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  profileId?: number;
}
