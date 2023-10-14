import { Consumer } from "@prisma/client";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateConsumerRequest } from "./dto/create-consumer.request";
import { UpdateConsumerRequest } from "./dto/update-consumer.request";

export interface IConsumerRepository {
  create(createRequest: CreateConsumerRequest): Promise<Consumer>;
  findMany(paginationQuery: PaginationQuery): Promise<Consumer[]>;
  findById(id: number): Promise<Consumer>;
  findByOwnerId(ownerId: number): Promise<Consumer>;
  update(id: number, updateReq: UpdateConsumerRequest): Promise<Consumer>;
  remove(id: number): Promise<Consumer>;
  countAll(): Promise<number>;
}

export const IConsumerRepository = Symbol("IConsumerRepository");
