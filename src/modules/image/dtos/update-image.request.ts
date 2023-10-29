import { PartialType } from "@nestjs/swagger";
import { CreateImageRequest } from "./create-image.request";

export class UpdateImageRequest extends PartialType(CreateImageRequest) {}
{
}
