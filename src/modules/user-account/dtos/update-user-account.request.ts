import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

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
  @IsNumberString()
  roleTypeId?: number;
}
