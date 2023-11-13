import { EPhoneType } from "@src/modules/types/phone/phone-type.enum";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreatePhoneRequest {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsEnum(EPhoneType)
  phoneType: EPhoneType;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  profileId?: number;
}
