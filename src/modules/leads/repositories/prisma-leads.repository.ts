import { Injectable } from "@nestjs/common";
import PrismaService from "@src/databases/prisma/prisma.service";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { CreateLeadRequest } from "../dtos/create-lead.request";
import { UpdateLeadRequest } from "../dtos/update-lead.request";
import { Lead } from "../entities/lead.entity";
import { ILeadsRepository } from "../interfaces/leads-repository.interface";

@Injectable()
export class PrismaLeadsRepository implements ILeadsRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateLeadRequest): Promise<Lead> {
    const { email } = createRequest;
    const created: Lead = await this.db.lead.create({ data: { email } });
    return created;
  }
  async findMany(commonQuery: CommonQuery<Lead>): Promise<Lead[]> {
    const { filters, orderBy } = commonQuery;

    const { limit, page } = { ...commonQuery.pagination };

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Lead[] = await this.db.lead.findMany({
      take,
      skip,
      where: filters,
      orderBy,
    });

    return list;
  }
  async findById(id: number): Promise<Lead> {
    const item: Lead = await this.db.lead.findFirst({ where: { id } });
    return item;
  }
  async update(id: number, updateReq: UpdateLeadRequest): Promise<Lead> {
    const { email } = updateReq;

    const updatedResource = await this.db.lead.update({
      where: {
        id: id,
      },
      data: {
        email,
      },
    });

    return updatedResource;
  }
  async remove(id: number): Promise<Lead> {
    const removed = await this.db.lead.delete({ where: { id } });
    return removed;
  }
  async countAll(filters: Partial<Lead>): Promise<number> {
    return await this.db.lead.count({ where: filters });
  }
}
