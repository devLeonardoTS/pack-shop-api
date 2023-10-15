import { HttpException, HttpStatus } from "@nestjs/common";

export class DatabaseException extends HttpException {
  constructor(objectOrError?: string | object | any) {
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    super(
      {
        statusCode,
        message: "Database operation failed.",
        error: "Internal Server Error",
      },
      statusCode,
    );
  }
}
