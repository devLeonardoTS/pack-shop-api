import { PartialType } from "@nestjs/swagger";
import { CreateProfileImageRequest } from "./create-profile-image.request";

export class UpdateProfileImageRequest extends PartialType(
  CreateProfileImageRequest,
) {}
