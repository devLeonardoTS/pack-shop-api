import { Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateProfileRequest {
  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  isSubscribedToOffers: boolean;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userAccountId?: number;
}
