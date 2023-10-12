import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateBusinessTypeRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  type: string;
}
