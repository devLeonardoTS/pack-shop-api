import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { Consumer } from "@prisma/client";
import { ConsumerService } from "@src/modules/consumer/consumer-profile.service";
import { CreateConsumerRequest } from "@src/modules/consumer/dto/create-consumer.request";

@Controller("profile/:profileId/consumer")
export class ProfileConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Post()
  async create(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() createRequest: CreateConsumerRequest,
  ): Promise<Consumer> {
    createRequest.profileId = profileId;
    return await this.consumerService.create(createRequest);
  }

  @Get()
  async findByParentId(
    @Param("profileId", ParseIntPipe) profileId: number,
  ): Promise<Consumer> {
    return this.consumerService.findOne({ filters: { profileId } });
  }
}
