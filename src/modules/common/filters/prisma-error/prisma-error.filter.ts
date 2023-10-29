import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Response } from "express";
import { DatabaseException } from "../../exceptions/database.exception";

@Catch(Prisma.PrismaClientValidationError)
export class PrismaClientValidationErrorFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const prismaErrorCode = exception.code;

    let error: HttpException;

    switch (prismaErrorCode) {
      case "P2002":
        error = new ConflictException();
        return response.status(error.getStatus()).json(error.getResponse());
      case "P2025":
        error = new NotFoundException();
        return response.status(error.getStatus()).json(error.getResponse());
      default:
        if (exception.message.includes("Invalid value provided")) {
          error = new BadRequestException(
            "Invalid value provided, check model schema.",
          );
          return response.status(error.getStatus()).json(error.getResponse());
        }
        if (exception.message.includes("Unknown argument")) {
          error = new BadRequestException(
            "Unknown value provided, check model schema.",
          );
          return response.status(error.getStatus()).json(error.getResponse());
        }

        const isInProductionMode = process.env.NODE_ENV === "production";

        if (!isInProductionMode) {
          console.error(exception);
        }

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

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnownErrorFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const prismaErrorCode = exception.code;

    let error: HttpException;

    switch (prismaErrorCode) {
      case "P2002":
        error = new ConflictException();
        return response.status(error.getStatus()).json(error.getResponse());
      case "P2025":
        error = new NotFoundException();
        return response.status(error.getStatus()).json(error.getResponse());
      default:
        const isInProductionMode = process.env.NODE_ENV === "production";

        if (!isInProductionMode) {
          console.error(exception);
        }

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

@Catch(Prisma.PrismaClientUnknownRequestError)
export class PrismaClientUnknownRequestErrorFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const prismaErrorCode = exception.code;

    let error: HttpException;

    switch (prismaErrorCode) {
      default:
        const isInProductionMode = process.env.NODE_ENV === "production";

        if (!isInProductionMode) {
          console.error(exception);
        }

        error = new BadRequestException();
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
