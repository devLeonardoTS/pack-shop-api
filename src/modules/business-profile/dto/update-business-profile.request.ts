import { PartialType } from "@nestjs/swagger";
import { CreateBusinessProfileRequest } from "./create-business-profile.request";

export class UpdateBusinessProfileRequest extends PartialType(
  CreateBusinessProfileRequest,
) {}
