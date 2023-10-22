import { PartialType } from "@nestjs/swagger";
import { CreateAccountRoleTypeRequest } from "./create-account-role-type.request";

export class UpdateAccountRoleTypeRequest extends PartialType(
  CreateAccountRoleTypeRequest,
) {}
