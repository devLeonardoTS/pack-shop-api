import { ApiProperty } from "@nestjs/swagger";

export class CreateLeadRequest {
  @ApiProperty()
  email: string;
}
