import { EAccountRoleType } from "@src/modules/account-role-type/enums/account-role-type.enum";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserAccountRequest {
  @IsOptional()
  @IsNotEmpty()
  currentPassword?: string;

  @IsOptional()
  @IsNotEmpty()
  newPassword?: string;

  @IsOptional()
  @IsNotEmpty()
  confirmNewPassword?: string;

  @IsOptional()
  @IsEnum(EAccountRoleType)
  roleType?: EAccountRoleType;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  isConfirmed?: boolean;
}
