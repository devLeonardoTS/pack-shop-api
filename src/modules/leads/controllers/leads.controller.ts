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
  UseFilters,
} from "@nestjs/common";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { PrismaErrorFilter } from "@src/modules/common/filters/prisma-error/prisma-error.filter";
import { CreateLeadRequest } from "../dtos/create-lead.request";
import { UpdateLeadRequest } from "../dtos/update-lead.request";
import { Lead } from "../entities/lead.entity";
import { LeadsService } from "../services/leads.service";

@Controller("leads")
@UseFilters(PrismaErrorFilter)
export class LeadsControllerV1 {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Body() createRequest: CreateLeadRequest): Promise<Lead> {
    return await this.leadsService.create(createRequest);
  }

  @Get()
  async findMany(
    @Query() query: PaginationQuery,
  ): Promise<PaginationResponse<Lead>> {
    const result = await this.leadsService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Lead> {
    return this.leadsService.findById(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateLeadRequest,
  ): Promise<Lead> {
    return await this.leadsService.update(id, updateRequest);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Lead> {
    return await this.leadsService.remove(id);
  }
}
