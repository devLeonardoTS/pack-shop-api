import { PartialType } from "@nestjs/swagger";
import { CreatePhoneRequest } from "./create-phone.request";

export class UpdatePhoneRequest extends PartialType(CreatePhoneRequest) {}
