import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAccountOriginTypeRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  origin: string;
}
