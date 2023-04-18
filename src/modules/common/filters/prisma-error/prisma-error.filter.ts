import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Response } from "express";
import { DatabaseException } from "../../exceptions/database.exception";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const prismaErrorCode = exception.code;

    let error: HttpException;

    switch (prismaErrorCode) {
      case "P2002":
        error = new ConflictException();
        return response.status(error.getStatus()).json(error.getResponse());
      default:
        error = new DatabaseException();
        const errorResponse = error.getResponse();
        return response
          .status(error.getStatus())
          .json(
            typeof errorResponse === "object"
              ? { ...errorResponse, errorCode: prismaErrorCode }
              : error.getResponse(),
          );
    }
  }
}
