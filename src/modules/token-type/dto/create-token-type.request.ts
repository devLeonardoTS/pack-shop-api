import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTokenTypeRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  type: string;
}
