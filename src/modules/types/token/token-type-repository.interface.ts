import { TokenType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateTokenTypeRequest } from "./dtos/create-token-type.request";
import { UpdateTokenTypeRequest } from "./dtos/update-token-type.request";

export interface ITokenTypeRepository {
  create(createRequest: CreateTokenTypeRequest): Promise<TokenType>;
  findMany(commonQuery: CommonQuery<TokenType>): Promise<TokenType[]>;
  findOne(commonQuery: CommonQuery<TokenType>): Promise<TokenType>;
  update(id: number, updateReq: UpdateTokenTypeRequest): Promise<TokenType>;
  remove(id: number): Promise<TokenType>;
  countAll(filters: Partial<TokenType>): Promise<number>;
}

export const ITokenTypeRepository = Symbol("ITokenTypeRepository");
