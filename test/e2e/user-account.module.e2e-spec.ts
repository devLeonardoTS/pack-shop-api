import { HttpStatus, INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { UserAccount } from "@prisma/client";
import { AppHttpSetup } from "@src/app-http.setup";
import PrismaService from "@src/databases/prisma/prisma.service";
import { GlobalServicesModule } from "@src/global-services.module";
import { EAccountOriginType } from "@src/modules/types/account-origin/account-origin-type.enum";
import { EAccountRoleType } from "@src/modules/types/account-role/account-role-type.enum";
import { CreateUserAccountRequest } from "@src/modules/user-account/dtos/create-user-account.request";
import { UpdateUserAccountRequest } from "@src/modules/user-account/dtos/update-user-account.request";
import { UserAccountModule } from "@src/modules/user-account/user-account.module";
import { BaseConfigsSeeder } from "prisma/seeders/base-configs-seeder";
import { SeedFactory } from "prisma/utils/seed-factory";
import queryString from "query-string";
import * as request from "supertest";

describe("user-account module", () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        GlobalServicesModule,
        UserAccountModule,
      ],
    }).compile();

    app = module.createNestApplication();

    prismaService = module.get<PrismaService>(PrismaService);

    await SeedFactory(prismaService, [BaseConfigsSeeder]);
    await AppHttpSetup(app); // Set base configs for server start-up.
    await app.init();
  });

  afterAll(async () => {
    await prismaService.clearDb();
  });

  describe("User Account Controller v1", () => {
    const baseEndpoint = "/v1/user-account";

    describe('POST: "/v1/user-account"', () => {
      it("Should create new User Account when receives valid input, returning created resource", async () => {
        const input: CreateUserAccountRequest = {
          email: "e2e-test-create@example.com",
          originType: EAccountOriginType.LOCAL,
          roleType: EAccountRoleType.ADMIN,
          password: "adm123",
          confirmPassword: "adm123",
        };

        const expected = expect.objectContaining<UserAccount>({
          id: expect.any(Number),
          originTypeId: expect.any(Number),
          roleTypeId: expect.any(Number),
          email: input.email,
          password: expect.any(String),
          isActive: expect.any(Boolean),
          isConfirmed: expect.any(Boolean),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });

        const result = await request(app.getHttpServer())
          .post(baseEndpoint)
          .send(input);

        expect(result.status).toEqual(HttpStatus.CREATED);
        expect(result.body).toEqual(expected);
      });

      describe("Should throw BAD REQUEST when:", () => {
        it("Receives invalid e-mail, returning error details", async () => {
          const input: CreateUserAccountRequest = {
            email: "e2e-test-invalid-email",
            originType: EAccountOriginType.LOCAL,
            roleType: EAccountRoleType.ADMIN,
            password: "??",
            confirmPassword: "???",
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

        it("Receives invalid account role or type, returning error details", async () => {
          const input: CreateUserAccountRequest = {
            email: "e2e-test-create@example.com",
            originType: "NOT_EXISTING_TYPE" as EAccountOriginType,
            roleType: "NOT_EXISTING_TYPE" as EAccountRoleType,
            password: "my-Okay-Passw0rd",
            confirmPassword: "my-Okay-Passw0rd",
          };

          const expected = expect.objectContaining({
            error: expect.any(String),
            message: expect.any(String),
            statusCode: HttpStatus.BAD_REQUEST,
          });

          const result = await request(app.getHttpServer())
            .post(baseEndpoint)
            .send(input);

          expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
          expect(result.body).toEqual(expected);
        });

        it("Receives mismatching password confirmation, returning error details", async () => {
          const input: CreateUserAccountRequest = {
            email: "e2e-test-create@example.com",
            originType: EAccountOriginType.LOCAL,
            roleType: EAccountRoleType.ADMIN,
            password: "??",
            confirmPassword: "???",
          };

          const expected = expect.objectContaining({
            error: expect.any(String),
            message: expect.any(String),
            statusCode: HttpStatus.BAD_REQUEST,
          });

          const result = await request(app.getHttpServer())
            .post(baseEndpoint)
            .send(input);

          expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
          expect(result.body).toEqual(expected);
        });
      });

      describe("Should throw CONFLICT when:", () => {
        it("Receives existing email, returning error details", async () => {
          const input: CreateUserAccountRequest = {
            email: "e2e-test-create@example.com",
            originType: EAccountOriginType.LOCAL,
            roleType: EAccountRoleType.ADMIN,
            password: "adm123",
            confirmPassword: "adm123",
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
    });

    describe('GET: "/v1/user-account"', () => {
      it("Should retrieve user-accounts, returning a paginated result", async () => {
        const expected = expect.objectContaining({
          total: expect.any(Number),
          pages: expect.any(Number),
          previous: expect.any(Boolean),
          next: expect.any(Boolean),
          data: expect.arrayContaining<UserAccount>([
            {
              id: expect.any(Number),
              originTypeId: expect.any(Number),
              roleTypeId: expect.any(Number),
              email: expect.any(String),
              password: expect.any(String),
              isActive: expect.any(Boolean),
              isConfirmed: expect.any(Boolean),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          ]),
        });

        const result = await request(app.getHttpServer()).get(baseEndpoint);

        expect(result.status).toEqual(HttpStatus.OK);
        expect(result.body).toEqual(expected);
      });

      describe("Should work with Pagination Queries", () => {
        it("Receives pagination query (page & limit), returning corresponding paginated result", async () => {
          const expected = expect.objectContaining({
            total: expect.any(Number),
            pages: expect.any(Number),
            previous: expect.any(Boolean),
            next: expect.any(Boolean),
            data: expect.arrayContaining<UserAccount>([
              {
                id: expect.any(Number),
                originTypeId: expect.any(Number),
                roleTypeId: expect.any(Number),
                email: expect.any(String),
                password: expect.any(String),
                isActive: expect.any(Boolean),
                isConfirmed: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
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
        });
      });
    });

    describe('GET: "/v1/user-account/:id"', () => {
      it("Should retrieve an User Account by id, returning found resource", async () => {
        const param = 1;

        const expected = expect.objectContaining<UserAccount>({
          id: expect.any(Number),
          originTypeId: expect.any(Number),
          roleTypeId: expect.any(Number),
          email: expect.any(String),
          password: expect.any(String),
          isActive: expect.any(Boolean),
          isConfirmed: expect.any(Boolean),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });

        const result = await request(app.getHttpServer()).get(
          baseEndpoint + `/${param}`,
        );

        expect(result.status).toEqual(HttpStatus.OK);
        expect(result.body).toEqual(expected);
      });
    });

    describe('PUT: "/v1/user-account/:id"', () => {
      it("Should update User Account found by id, returning updated resource", async () => {
        const param = 2;

        const input: UpdateUserAccountRequest = {
          currentPassword: "adm123",
          newPassword: "admin123",
          confirmNewPassword: "admin123",
        };

        const expected = expect.objectContaining<Omit<UserAccount, "password">>(
          {
            id: expect.any(Number),
            originTypeId: expect.any(Number),
            roleTypeId: expect.any(Number),
            email: expect.any(String),
            isActive: expect.any(Boolean),
            isConfirmed: expect.any(Boolean),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        );

        const result = await request(app.getHttpServer())
          .put(baseEndpoint + `/${param}`)
          .send(input);

        expect(result.status).toEqual(HttpStatus.OK);
        expect(result.body).toEqual(expected);
      });

      describe("Should throw UNAUTHORIZED when:", () => {
        it("Receives mismatching currentPassword, returning error details", async () => {
          const param = 1;

          const input: UpdateUserAccountRequest = {
            currentPassword: "not-so-right-passw0rd",
            newPassword: "admin123",
            confirmNewPassword: "admin123",
          };

          const expected = expect.objectContaining({
            message: expect.any(String),
            statusCode: HttpStatus.UNAUTHORIZED,
          });

          const result = await request(app.getHttpServer())
            .put(baseEndpoint + `/${param}`)
            .send(input);

          expect(result.status).toEqual(HttpStatus.UNAUTHORIZED);
          expect(result.body).toEqual(expected);
        });
      });

      describe("Should throw BAD REQUEST when:", () => {
        it("Receives mismatching empty, returning error details", async () => {
          const param = 1;

          const input: UpdateUserAccountRequest = {
            currentPassword: "admin123",
            newPassword: "",
            confirmNewPassword: "",
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
    });

    describe('DELETE: "/v1/user-account/:id"', () => {
      it("should delete User Account by id, returning deleted User Account", async () => {
        const param = 1;

        const expected = expect.objectContaining<Omit<UserAccount, "password">>(
          {
            id: expect.any(Number),
            originTypeId: expect.any(Number),
            roleTypeId: expect.any(Number),
            email: expect.any(String),
            isActive: expect.any(Boolean),
            isConfirmed: expect.any(Boolean),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
        );

        const result = await request(app.getHttpServer()).delete(
          baseEndpoint + `/${param}`,
        );

        expect(result.status).toEqual(HttpStatus.OK);
        expect(result.body).toEqual(expected);
      });
    });
  });
});
