import { PartialType } from "@nestjs/swagger";
import { CreateProductTypeRequest } from "./create-product-type.request";

export class UpdateProductTypeRequest extends PartialType(
  CreateProductTypeRequest,
) {}
