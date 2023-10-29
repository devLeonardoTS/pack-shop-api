import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateProductTypeRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  type: string;
}
