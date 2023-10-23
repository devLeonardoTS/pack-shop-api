import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from "@nestjs/common";
import { Consumer } from "@prisma/client";
import { CommonQuery } from "../common/dtos/common.query";
import { PaginationResponse } from "../common/dtos/pagination.response";
import { ConsumerService } from "./consumer-profile.service";
import { UpdateConsumerRequest } from "./dto/update-consumer.request";

@Controller("consumer")
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Get()
  async findMany(
    @Query() query: CommonQuery<Consumer>,
  ): Promise<PaginationResponse<Consumer>> {
    const result = await this.consumerService.findMany(query);
    return result;
  }

  @Get(":id")
  async findById(
    @Param("id", ParseIntPipe) id: number,
    @Query() query: CommonQuery<Consumer>,
  ): Promise<Consumer> {
    query.filters.id = id;
    return this.consumerService.findOne(query);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateConsumerRequest,
  ): Promise<Consumer> {
    const resource = await this.consumerService.update(id, updateRequest);
    return resource;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Consumer> {
    return await this.consumerService.remove(id);
  }
}
