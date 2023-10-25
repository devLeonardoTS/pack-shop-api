import { PartialType } from "@nestjs/swagger";
import { CreateBusinessOwnerRequest } from "./create-business-owner.request";

export class UpdateBusinessOwnerRequest extends PartialType(
  CreateBusinessOwnerRequest,
) {}
