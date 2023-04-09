import { HttpStatus, INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@src/databases/prisma/prisma.service";
import { GlobalServicesModule } from "@src/global-services.module";
import { CreateLeadRequest } from "@src/modules/leads/dtos/create-lead.request";
import { UpdateLeadRequest } from "@src/modules/leads/dtos/update-lead.request";
import { LeadsModule } from "@src/modules/leads/leads.module";
import { AppHttpSetup } from "@src/utils/app-http.setup";
import { LeadSeeder } from "prisma/seeders/lead-seeder";
import { SeedFactory } from "prisma/utils/seed-factory";
import queryString from "query-string";
import * as request from "supertest";

describe("leads module", () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        GlobalServicesModule,
        LeadsModule,
      ],
    }).compile();

    app = module.createNestApplication();

    prismaService = module.get<PrismaService>(PrismaService);

    await SeedFactory(prismaService, [LeadSeeder]);
    await AppHttpSetup(app);
    await app.init();
  });

  afterAll(async () => {
    await prismaService.clearDb();
  });

  describe("leads controller v1", () => {
    const baseEndpoint = "/v1/leads";

    describe('post: "/v1/leads"', () => {
      it("should create new lead when receives valid input then return created lead", async () => {
        const input: CreateLeadRequest = {
          email: "e2e-test-create@example.com",
        };

        const expected = expect.objectContaining({
          id: expect.any(Number),
          email: input.email,
          createdAt: expect.any(String),
        });

        const result = await request(app.getHttpServer())
          .post(baseEndpoint)
          .send(input);

        expect(result.status).toEqual(HttpStatus.CREATED);
        expect(result.body).toEqual(expected);
      });

      it("should throw bad request error when receives invalid input then return error details", async () => {
        const input: CreateLeadRequest = {
          email: "e2e-test-invalid-email",
        };

        const expected = expect.objectContaining({
          error: expect.any(String),
          message: expect.arrayContaining([expect.any(String)]),
          statusCode: HttpStatus.BAD_REQUEST,
        });

        const result = await request(app.getHttpServer())
          .post(baseEndpoint)
          .send(input);

        expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(result.body).toEqual(expected);
      });

      it("should fail to create a lead when receives existing email then return error", async () => {
        const input: CreateLeadRequest = {
          email: "e2e-test-create@example.com",
        };

        const expected = expect.objectContaining({
          message: expect.any(String),
          statusCode: HttpStatus.CONFLICT,
        });

        const result = await request(app.getHttpServer())
          .post(baseEndpoint)
          .send(input);

        expect(result.status).toEqual(HttpStatus.CONFLICT);
        expect(result.body).toEqual(expected);
      });
    });

    describe('get: "/v1/leads"', () => {
      it("should retrieve leads when called then return a paginated result", async () => {
        const expected = expect.objectContaining({
          total: expect.any(Number),
          pages: expect.any(Number),
          previous: expect.any(Boolean),
          next: expect.any(Boolean),
          data: expect.arrayContaining([
            {
              id: expect.any(Number),
              email: expect.any(String),
              createdAt: expect.any(String),
            },
          ]),
        });

        const result = await request(app.getHttpServer()).get(baseEndpoint);

        expect(result.status).toEqual(HttpStatus.OK);
        expect(result.body).toEqual(expected);
      });
    });

    describe('get: "/v1/leads"', () => {
      it("should retrieve leads when called with pagination query then return corresponding paginated result", async () => {
        const expected = expect.objectContaining({
          total: expect.any(Number),
          pages: expect.any(Number),
          previous: expect.any(Boolean),
          next: expect.any(Boolean),
          data: expect.arrayContaining([
            {
              id: expect.any(Number),
              email: expect.any(String),
              createdAt: expect.any(String),
            },
          ]),
        });

        const query = queryString.stringify({
          page: 1,
          limit: 3,
        });

        const result = await request(app.getHttpServer())
          .get(baseEndpoint)
          .query(query);

        expect(result.status).toEqual(HttpStatus.OK);
        expect(result.body).toEqual(expected);
        expect(result.body.data.length).toEqual(3);
      });
    });

    describe('get: "/v1/leads/:id"', () => {
      it("should retrieve a lead by id when called then return found lead", async () => {
        const param = 1;

        const expected = expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          createdAt: expect.any(String),
        });

        const result = await request(app.getHttpServer()).get(
          baseEndpoint + `/${param}`,
        );

        expect(result.status).toEqual(HttpStatus.OK);
        expect(result.body).toEqual(expected);
      });
    });

    describe('put: "/v1/leads/:id"', () => {
      it("should update lead found by id when called then return updated lead", async () => {
        const param = 1;

        const input: UpdateLeadRequest = {
          email: "e2e-test-put@example.com",
        };

        const expected = expect.objectContaining({
          id: 1,
          email: input.email,
          createdAt: expect.any(String),
        });

        const result = await request(app.getHttpServer())
          .put(baseEndpoint + `/${param}`)
          .send(input);

        expect(result.status).toEqual(HttpStatus.OK);
        expect(result.body).toEqual(expected);
      });

      it("should throw bad request error when receives invalid input then return error details", async () => {
        const param = 1;

        const input: UpdateLeadRequest = {
          email: "e2e-test-invalid-email",
        };

        const expected = expect.objectContaining({
          error: expect.any(String),
          message: expect.arrayContaining([expect.any(String)]),
          statusCode: HttpStatus.BAD_REQUEST,
        });

        const result = await request(app.getHttpServer())
          .put(baseEndpoint + `/${param}`)
          .send(input);

        expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(result.body).toEqual(expected);
      });
    });

    describe('delete: "/v1/leads/:id"', () => {
      it("should delete lead by id when called then return deleted lead", async () => {
        const param = 1;

        const expected = expect.objectContaining({
          id: 1,
          email: expect.any(String),
          createdAt: expect.any(String),
        });

        const result = await request(app.getHttpServer()).delete(
          baseEndpoint + `/${param}`,
        );

        expect(result.status).toEqual(HttpStatus.OK);
        expect(result.body).toEqual(expected);
      });
    });
  });
});
