import { PartialType } from "@nestjs/swagger";
import { CreateProductTagRequest } from "./create-product-tag.request";

export class UpdateProductTagRequest extends PartialType(
  CreateProductTagRequest,
) {}
