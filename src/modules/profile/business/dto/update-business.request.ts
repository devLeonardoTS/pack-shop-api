import { PartialType } from "@nestjs/swagger";
import { CreateBusinessRequest } from "./create-business.request";

export class UpdateBusinessRequest extends PartialType(CreateBusinessRequest) {}
