import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { CreateProfileImageRequest } from "./create-profile-image.request";

export class UpdateProfileImageRequest extends PartialType(
  CreateProfileImageRequest,
) {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  resourceId?: number;
}
