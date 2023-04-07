import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateLeadRequest } from "../dtos/create-lead.request";
import { UpdateLeadRequest } from "../dtos/update-lead.request";
import { Lead } from "../entities/lead.entity";
import { ILeadsRepository } from "../interfaces/leads-repository.interface";

@Injectable()
export class MemoryLeadsRepository implements ILeadsRepository {
  private leads: Lead[] = [
    {
      id: 1,
      email: faker.internet.email(),
      createdAt: new Date("2023-04-07T18:44:54.299Z"),
    },
    {
      id: 2,
      email: faker.internet.email(),
      createdAt: new Date("2023-04-07T18:44:55.174Z"),
    },
    {
      id: 3,
      email: faker.internet.email(),
      createdAt: new Date("2023-04-07T18:44:55.849Z"),
    },
    {
      id: 4,
      email: faker.internet.email(),
      createdAt: new Date("2023-04-07T18:44:56.498Z"),
    },
  ];
  private leadsCounter: number = this.leads.length;

  async create(createRequest: CreateLeadRequest): Promise<Lead> {
    const created: Lead = {
      id: ++this.leadsCounter,
      email: createRequest.email,
      createdAt: new Date(),
    };
    this.leads.push(created);
    return created;
  }
  async findMany(paginationQuery: PaginationQuery): Promise<Lead[]> {
    const { page, limit } = paginationQuery;

    const take = limit;
    const skip = (page - 1) * limit;

    const list = [...this.leads].splice(skip, take);
    return list;
  }
  async findById(id: number): Promise<Lead> {
    const item: Lead = await this.leads.find((item) => item.id === id);
    return item;
  }
  async update(id: number, updateReq: UpdateLeadRequest): Promise<Lead> {
    const targetIndex = this.leads.findIndex((item) => item.id === id);
    let updated: Lead | undefined = undefined;

    if (targetIndex >= 0) {
      const updateTarget = this.leads[targetIndex];
      const dataSource = updateReq;

      updated = Object.keys(updateTarget).reduce((obj, key) => {
        if (key in dataSource) {
          obj[key] = dataSource[key];
        } else {
          obj[key] = updateTarget[key];
        }
        return obj;
      }, updateTarget);

      this.leads[targetIndex] = updated;
    }

    return updated;
  }
  async remove(id: number): Promise<Lead> {
    let target: Lead;
    this.leads = this.leads.filter((item) => {
      if (item.id === id) {
        target = item;
        return false;
      }

      return true;
    });
    return target;
  }
  async countAll(): Promise<number> {
    return this.leads.length;
  }
}
