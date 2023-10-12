import { PartialType } from "@nestjs/swagger";
import { CreateProfileRequest } from "./create-profile.request";

export class UpdateProfileRequest extends PartialType(CreateProfileRequest) {}
