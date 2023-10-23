import { PartialType } from "@nestjs/swagger";
import { CreateBusinessTypeRequest } from "./create-business-type.request";

export class UpdateBusinessTypeRequest extends PartialType(
  CreateBusinessTypeRequest,
) {}
