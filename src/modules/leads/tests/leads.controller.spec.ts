import { Test, TestingModule } from "@nestjs/testing";
import { LeadsControllerV1 } from "../controllers/leads.controller";
import { ILeadsRepository } from "../interfaces/leads-repository.interface";
import { LeadsService } from "../services/leads.service";

describe("LeadsController", () => {
  let controller: LeadsControllerV1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsControllerV1],
      providers: [
        LeadsService,
        {
          provide: ILeadsRepository,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<LeadsControllerV1>(LeadsControllerV1);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
