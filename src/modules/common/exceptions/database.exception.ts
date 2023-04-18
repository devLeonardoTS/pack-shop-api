import { HttpException, HttpStatus } from "@nestjs/common";

export class DatabaseException extends HttpException {
  constructor(objectOrError?: string | object | any) {
    super(objectOrError || "Bad Gateway", HttpStatus.BAD_GATEWAY);
  }
}
