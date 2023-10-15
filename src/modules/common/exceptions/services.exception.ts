import { HttpException, HttpStatus } from "@nestjs/common";

export class ServicesException extends HttpException {
  constructor(objectOrError?: string | object | any) {
    const statusCode = HttpStatus.SERVICE_UNAVAILABLE;
    super(
      {
        statusCode,
        message: "External service is currently unavailable.",
        error: "Service Unavailable",
      },
      statusCode,
    );
  }
}
