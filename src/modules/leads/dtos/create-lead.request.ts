import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateLeadRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
