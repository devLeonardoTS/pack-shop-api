import { PartialType } from "@nestjs/swagger";
import { CreateTokenTypeRequest } from "./create-token-type.request";

export class UpdateTokenTypeRequest extends PartialType(
  CreateTokenTypeRequest,
) {}
