import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from "class-validator";

export class CreateUserAccountRequest {
  @IsNumberString()
  roleTypeId: number;

  @IsNumberString()
  originTypeId: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  password?: string;
}
