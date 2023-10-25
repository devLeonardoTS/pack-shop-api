import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePhoneTypeRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  type: string;
}
