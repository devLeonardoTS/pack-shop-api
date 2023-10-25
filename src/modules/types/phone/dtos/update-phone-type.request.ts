import { PartialType } from "@nestjs/swagger";
import { CreatePhoneTypeRequest } from "./create-phone-type.request";

export class UpdatePhoneTypeRequest extends PartialType(
  CreatePhoneTypeRequest,
) {}
