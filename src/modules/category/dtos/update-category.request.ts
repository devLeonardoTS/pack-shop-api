import { PartialType } from "@nestjs/swagger";
import { CreateCategoryRequest } from "./create-category.request";

export class UpdateCategoryRequest extends PartialType(CreateCategoryRequest) {}
