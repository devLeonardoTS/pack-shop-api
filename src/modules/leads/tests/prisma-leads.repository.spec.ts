import { Test, TestingModule } from "@nestjs/testing";
import PrismaService from "@src/databases/prisma/prisma.service";
import { PaginationQuery } from "@src/modules/common/dtos/pagination.query";
import { CreateLeadRequest } from "../dtos/create-lead.request";
import { UpdateLeadRequest } from "../dtos/update-lead.request";
import { Lead } from "../entities/lead.entity";
import { PrismaLeadsRepository } from "../repositories/prisma-leads.repository";

describe("PrismaLeadsRepository", () => {
  let repository: PrismaLeadsRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaLeadsRepository,
        {
          provide: PrismaService,
          useValue: {
            lead: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrismaLeadsRepository>(PrismaLeadsRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("create", () => {
    it("should receive a creation request then create a new lead and return it", async () => {
      const request: CreateLeadRequest = { email: "test@example.com" };
      const expected: Lead = {
        id: 1,
        email: "test@example.com",
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.lead, "create").mockResolvedValueOnce(expected);

      const result = await repository.create(request);

      expect(prismaService.lead.create).toHaveBeenCalledWith({ data: request });
      expect(result).toEqual(expected);
    });
  });

  describe("findMany", () => {
    it("should receive a pagination query then return a paginated list of leads", async () => {
      const pagination: PaginationQuery = { page: 1, limit: 10 };
      const expected: Lead[] = [
        { id: 1, email: "test@example.com", createdAt: new Date() },
        { id: 2, email: "tester@example.com", createdAt: new Date() },
      ];

      jest
        .spyOn(prismaService.lead, "findMany")
        .mockResolvedValueOnce(expected);

      const result = await repository.findMany(pagination);

      expect(prismaService.lead.findMany).toHaveBeenCalledWith({
        take: pagination.limit,
        skip: (pagination.page - 1) * pagination.limit,
      });
      expect(result).toEqual(expected);
    });
  });

  describe("findById", () => {
    it("should receive an id then return the found lead", async () => {
      const id = 1;
      const expected: Lead = {
        id,
        email: "test@example.com",
        createdAt: new Date(),
      };

      jest
        .spyOn(prismaService.lead, "findFirst")
        .mockResolvedValueOnce(expected);

      const result = await repository.findById(id);

      expect(prismaService.lead.findFirst).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(expected);
    });
  });

  describe("update", () => {
    it("should receive an id then find a lead by id, update it and return it updated", async () => {
      const id = 1;
      const createdAt = new Date();
      const existing: Lead = {
        id,
        email: "test1@example.com",
        createdAt,
      };

      const updateRequest: UpdateLeadRequest = {
        email: "test_1@example.com",
      };

      const updated: Lead = {
        id,
        email: updateRequest.email,
        createdAt,
      };

      jest
        .spyOn(prismaService.lead, "findFirst")
        .mockResolvedValueOnce(existing);
      jest.spyOn(prismaService.lead, "update").mockResolvedValueOnce(updated);

      const result = await repository.update(id, updateRequest);

      expect(prismaService.lead.findFirst).toHaveBeenCalledWith({
        where: { id },
      });
      expect(prismaService.lead.update).toHaveBeenCalledWith({
        where: {
          id,
        },
        data: updated,
      });
      expect(result).toEqual(updated);
    });
  });

  describe("remove", () => {
    it("should receive an id then remove a lead by id and return the removed lead", async () => {
      const id = 1;

      const expected: Lead = {
        id,
        email: "test1@example.com",
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.lead, "delete").mockResolvedValueOnce(expected);

      const result = await repository.remove(id);

      expect(prismaService.lead.delete).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
      expect(result).toEqual(expected);
    });
  });
});
