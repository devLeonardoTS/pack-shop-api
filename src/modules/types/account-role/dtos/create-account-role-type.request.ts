import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAccountRoleTypeRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  role: string;
}
