import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateAccountOriginTypeRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  origin: string;
}
