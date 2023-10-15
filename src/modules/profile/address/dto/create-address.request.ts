import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateAddressRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  pais: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(9)
  cep: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  logradouro: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  numero: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  bairro: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  cidade: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  @Transform((p) => String(p.value).toUpperCase())
  estado: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  profileId?: number;
}
