import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateLeadRequest } from "../dtos/create-lead.request";
import { UpdateLeadRequest } from "../dtos/update-lead.request";
import { Lead } from "../entities/lead.entity";
import { ILeadsRepository } from "../interfaces/leads-repository.interface";

@Injectable()
export class PrismaLeadsRepository implements ILeadsRepository {
  constructor(private readonly db: PrismaService) {}

  async create(createRequest: CreateLeadRequest): Promise<Lead> {
    const created: Lead = await this.db.lead
      .create({ data: createRequest })
      .catch((error) => {
        throw error;
        // if (error instanceof Prisma.PrismaClientKnownRequestError) {
        //   if (error.code === "P2002") {
        //     throw new ConflictException();
        //   }
        // }
        // return undefined;
      });
    return created;
  }
  async findMany(paginationQuery: PaginationQuery): Promise<Lead[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list: Lead[] = await this.db.lead.findMany({
      take,
      skip,
    });

    return list;
  }
  async findById(id: number): Promise<Lead> {
    const item: Lead = await this.db.lead.findFirst({ where: { id } });
    return item;
  }
  async update(id: number, updateReq: UpdateLeadRequest): Promise<Lead> {
    const item = await this.findById(id);
    let updated: Lead | undefined = undefined;

    if (item && !isNaN(id)) {
      const updateTarget = item;
      const dataSource = updateReq;

      updated = Object.keys(updateTarget).reduce((obj, key) => {
        if (key in dataSource) {
          obj[key] = dataSource[key];
        } else {
          obj[key] = updateTarget[key];
        }
        return obj;
      }, updateTarget);

      updated = await this.db.lead.update({
        where: {
          id,
        },
        data: updated,
      });
    }

    return updated;
  }
  async remove(id: number): Promise<Lead> {
    const removed = await this.db.lead.delete({ where: { id } });
    return removed;
  }
  async countAll(): Promise<number> {
    return await this.db.lead.count();
  }
}
