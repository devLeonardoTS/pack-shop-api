import { EAccountRoleType } from "@src/modules/account-role-type/enums/account-role-type.enum";
import { EAccountOriginType } from "@src/modules/types/account-origin/account-origin-type.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserAccountRequest {
  @IsNotEmpty()
  @IsEnum(EAccountRoleType)
  roleType: EAccountRoleType;

  @IsNotEmpty()
  @IsEnum(EAccountOriginType)
  originType: EAccountOriginType;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  confirmPassword?: string;
}
