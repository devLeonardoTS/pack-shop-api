import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateTokenTypeRequest } from "../dto/create-token-type.request";
import { UpdateTokenTypeRequest } from "../dto/update-token-type.request";
import { TokenType } from "../entities/token-type.entity";

export interface ITokenTypeRepository {
  create(createRequest: CreateTokenTypeRequest): Promise<TokenType>;
  findMany(paginationQuery: PaginationQuery): Promise<TokenType[]>;
  findById(id: number): Promise<TokenType>;
  update(id: number, updateReq: UpdateTokenTypeRequest): Promise<TokenType>;
  remove(id: number): Promise<TokenType>;
  countAll(): Promise<number>;
}

export const ITokenTypeRepository = Symbol("ITokenTypeRepository");
