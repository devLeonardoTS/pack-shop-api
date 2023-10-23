import { PartialType } from "@nestjs/swagger";
import { CreateImageTypeRequest } from "./create-image-type.request";

export class UpdateImageTypeRequest extends PartialType(
  CreateImageTypeRequest,
) {}
