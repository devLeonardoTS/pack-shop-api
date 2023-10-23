import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Consumer } from "@prisma/client";
import { PaginationResponse } from "@src/modules/common/dtos/pagination.response";
import { CommonQuery } from "../common/dtos/common.query";
import { IConsumerRepository } from "./consumer-repository.interface";
import { CreateConsumerRequest } from "./dto/create-consumer.request";
import { UpdateConsumerRequest } from "./dto/update-consumer.request";

@Injectable()
export class ConsumerService {
  constructor(
    @Inject(IConsumerRepository)
    private readonly repository: IConsumerRepository,
  ) {}

  async create(createRequest: CreateConsumerRequest): Promise<Consumer> {
    const created = await this.repository.create(createRequest);
    return created;
  }

  async findMany(
    commonQuery: CommonQuery<Consumer>,
  ): Promise<PaginationResponse<Consumer>> {
    const {
      pagination: { limit, page },
      filters,
    } = commonQuery;

    const total = await this.repository.countAll(filters);
    const pages = Math.ceil(total / limit);
    const previous = page > 1 && page <= pages;
    const next = pages > 1 && page < pages;
    const data = await this.repository.findMany(commonQuery);

    const result: PaginationResponse<Consumer> = {
      total,
      pages,
      previous,
      next,
      data,
    };

    return result;
  }

  async findOne(commonQuery: CommonQuery<Consumer>): Promise<Consumer> {
    const resource = await this.repository.findOne(commonQuery);
    if (!resource) {
      throw new NotFoundException();
    }
    return resource;
  }

  async update(
    id: number,
    updateRequest: UpdateConsumerRequest,
  ): Promise<Consumer> {
    const updated = await this.repository.update(id, updateRequest);

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  async remove(id: number): Promise<Consumer> {
    return await this.repository.remove(id);
  }
}
