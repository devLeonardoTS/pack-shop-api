import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateConsumerRequest {
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  profileId?: number;
}
