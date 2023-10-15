import { PartialType } from "@nestjs/swagger";
import { CreateAddressRequest } from "./create-address.request";

export class UpdateAddressRequest extends PartialType(CreateAddressRequest) {}
