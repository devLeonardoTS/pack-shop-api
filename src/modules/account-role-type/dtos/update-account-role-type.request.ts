import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateAccountRoleTypeRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  role: string;
}
