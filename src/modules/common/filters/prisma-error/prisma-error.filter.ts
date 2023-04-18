import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const code = exception.code;

    let error: HttpException;

    switch (code) {
      case "P2002":
        error = new ConflictException();
        return response.status(error.getStatus()).json(error.getResponse());
      default:
        error = new InternalServerErrorException();
        return response.status(error.getStatus()).json(error.getResponse());
    }
  }
}
