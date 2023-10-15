import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Consumer } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { ConsumerService } from "./consumer-profile.service";
import { CreateConsumerRequest } from "./dto/create-consumer.request";
import { UpdateConsumerRequest } from "./dto/update-consumer.request";

@Controller("profile/:profileId/consumer")
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() createRequest: CreateConsumerRequest,
  ): Promise<Consumer> {
    createRequest.profileId = profileId;
    return await this.consumerService.create(createRequest);
  }

  @Get()
  async findByOwnerId(
    @Param("profileId", ParseIntPipe) profileId: number,
  ): Promise<Consumer> {
    return this.consumerService.findByOwnerId(profileId);
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Consumer> {
    return this.consumerService.findById(id);
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
