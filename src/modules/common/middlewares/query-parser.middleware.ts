import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { parse } from "express-query-parser";
import { CommonQuery } from "../dtos/common.query";

@Injectable()
export class QueryParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      parse(req.query, {
        parseBoolean: true,
        parseNull: true,
        parseNumber: true,
        parseUndefined: true,
      });

      const { page, limit, orderBy, ...others } = req.query;
      const commonQuery: CommonQuery<any> = {
        pagination: { page: page as any, limit: limit as any },
        filters: others,
        orderBy: orderBy || {},
      };
      req.query = commonQuery as any;
      next();
    } catch {
      throw new InternalServerErrorException("Middleware failure.");
    }
  }
}
