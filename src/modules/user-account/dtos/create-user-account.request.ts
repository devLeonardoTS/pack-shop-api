import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserAccountRequest {
  @IsNotEmpty()
  @Type(() => Number)
  roleTypeId: number;

  @IsNotEmpty()
  @Type(() => Number)
  originTypeId: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  confirmPassword?: string;
}
