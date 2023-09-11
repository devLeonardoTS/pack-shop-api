import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class UpdateUserAccountRequest {
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNumberString()
  roleTypeId?: number;
}
