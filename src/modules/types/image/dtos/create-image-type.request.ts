import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateImageTypeRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  type: string;
}
