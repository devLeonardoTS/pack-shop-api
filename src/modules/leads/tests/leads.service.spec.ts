import { Test, TestingModule } from "@nestjs/testing";
import { ILeadsRepository } from "../interfaces/leads-repository.interface";
import { LeadsService } from "../services/leads.service";

describe("LeadsService", () => {
  let service: LeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: ILeadsRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
