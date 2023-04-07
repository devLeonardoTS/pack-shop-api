import { PartialType } from "@nestjs/swagger";
import { CreateLeadRequest } from "./create-lead.request";

export class UpdateLeadRequest extends PartialType(CreateLeadRequest) {}
