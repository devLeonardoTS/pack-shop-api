import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateBusinessProfileRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  brand: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(14)
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  pictureUrl: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  profileSlug: string;
}
