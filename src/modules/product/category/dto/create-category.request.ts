import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;
}
