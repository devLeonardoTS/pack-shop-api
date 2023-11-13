import { EAccountOriginType } from "@src/modules/types/account-origin/account-origin-type.enum";
import { EAccountRoleType } from "@src/modules/types/account-role/account-role-type.enum";
import { EPhoneType } from "@src/modules/types/phone/phone-type.enum";
import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateUserPFRequest {
  @IsOptional()
  @IsEnum(EAccountRoleType)
  roleType: EAccountRoleType;

  @IsNotEmpty()
  @IsEnum(EAccountOriginType)
  originType: EAccountOriginType;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  isSubscribedToOffers: boolean;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  socialName: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  birthDate: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  pais: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
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
  @Transform(({ value }) => String(value).toUpperCase())
  estado: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  complemento: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsEnum(EPhoneType)
  phoneType: EPhoneType;

  @IsOptional()
  password?: string;

  @IsOptional()
  confirmPassword?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPrimaryAddress?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  addressTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  addressDescription?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPrimaryPhone?: boolean;
}
