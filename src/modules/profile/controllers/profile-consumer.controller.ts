import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Consumer } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { ConsumerService } from "@src/modules/consumer/consumer-profile.service";
import { CreateConsumerRequest } from "@src/modules/consumer/dto/create-consumer.request";

@Controller("profile/:profileId/consumer")
export class ProfileConsumerController {
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
  async findByParentId(
    @Param("profileId", ParseIntPipe) profileId: number,
  ): Promise<Consumer> {
    return this.consumerService.findOne({ filters: { profileId } });
  }
}
