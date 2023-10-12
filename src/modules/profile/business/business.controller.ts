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
import { Business } from "@prisma/client";
import { JwtAuthGuard } from "@src/modules/auth/jwt-auth.guard";
import { BusinessService } from "./business-profile.service";
import { CreateBusinessRequest } from "./dto/create-business.request";
import { UpdateBusinessRequest } from "./dto/update-business.request";

@Controller("profile/:profileId/business")
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() createRequest: CreateBusinessRequest,
  ): Promise<Business> {
    createRequest.profileId = profileId;
    return await this.businessService.create(createRequest);
  }

  @Get()
  async findByOwnerId(
    @Param("profileId", ParseIntPipe) profileId: number,
  ): Promise<Business> {
    return this.businessService.findByOwnerId(profileId);
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Business> {
    return this.businessService.findById(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRequest: UpdateBusinessRequest,
  ): Promise<Business> {
    const resource = await this.businessService.update(id, updateRequest);
    return resource;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<Business> {
    return await this.businessService.remove(id);
  }
}
