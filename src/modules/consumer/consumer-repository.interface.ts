import { Consumer } from "@prisma/client";
import { CommonQuery } from "../common/dtos/common.query";
import { CreateConsumerRequest } from "./dto/create-consumer.request";
import { UpdateConsumerRequest } from "./dto/update-consumer.request";

export interface IConsumerRepository {
  create(createRequest: CreateConsumerRequest): Promise<Consumer>;
  findMany(commonQuery: CommonQuery<Consumer>): Promise<Consumer[]>;
  findOne(commonQuery: CommonQuery<Consumer>): Promise<Consumer>;
  update(id: number, updateReq: UpdateConsumerRequest): Promise<Consumer>;
  remove(id: number): Promise<Consumer>;
  countAll(filters: Partial<Consumer>): Promise<number>;
}

export const IConsumerRepository = Symbol("IConsumerRepository");
