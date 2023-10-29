import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { TokenType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateTokenTypeRequest } from "./dtos/create-token-type.request";
import { UpdateTokenTypeRequest } from "./dtos/update-token-type.request";
import { TokenTypeService } from "./token-type.service";

@Controller("types/token")
export class TokenTypeController {
  constructor(
    private readonly tokenTypeService: TokenTypeService, // private readonly tokenService: TokenService,
  ) {}

  @Post()
  async create(
    @Body() createRequest: CreateTokenTypeRequest,
  ): Promise<TokenType> {
    return await this.tokenTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: CommonQuery<TokenType>,
  ): Promise<PaginationResponse<TokenType>> {
    const result = await this.tokenTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<TokenType>,
  ): Promise<TokenType> {
    query.filters.id = id;
    return this.tokenTypeService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateTokenTypeRequest,
  ): Promise<TokenType> {
    return await this.tokenTypeService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<TokenType> {
    return await this.tokenTypeService.remove(id);
  }

  // @Get(":id/token")
  // async findManyToken(
  //   @Param("id", ParseIntPipe) id: number,
  //   @Query() query: CommonQuery<Business>,
  // ): Promise<PaginationResponse<Business>> {
  //   query.filters.businessTypeId = id;
  //   const result = await this.tokenService.findMany(query);
  //   return result;
  // }
}
