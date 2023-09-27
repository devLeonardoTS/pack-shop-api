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
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CreateTokenTypeRequest } from "../dto/create-token-type.request";
import { UpdateTokenTypeRequest } from "../dto/update-token-type.request";
import { TokenType } from "../entities/token-type.entity";
import { TokenTypeService } from "../services/token-type.service";

@Controller("token-type")
export class TokenTypeController {
  constructor(private readonly TokenTypeService: TokenTypeService) {}

  @Post()
  async create(
    @Body() createRequest: CreateTokenTypeRequest,
  ): Promise<TokenType> {
    return await this.TokenTypeService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<TokenType>> {
    const result = await this.TokenTypeService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<TokenType> {
    return this.TokenTypeService.findById(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateTokenTypeRequest,
  ): Promise<TokenType> {
    return await this.TokenTypeService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<TokenType> {
    return await this.TokenTypeService.remove(id);
  }
}
