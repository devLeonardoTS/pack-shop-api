import { EBusinessType } from "@src/modules/types/business/business-type.enum";
import { Type } from "class-transformer";
import {
  IsDate,
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
  razaoSocial: string;

  @IsNotEmpty()
  @IsString()
  nomeFantasia: string;

  @IsNotEmpty()
  @IsString()
  inscricaoMunicipal: string;

  @IsNotEmpty()
  @IsString()
  inscricaoEstadual: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dataAbertura: Date;

  @IsNotEmpty()
  @IsEnum(EBusinessType)
  businessType: EBusinessType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  profileId?: number;
}
