import { HttpStatus, INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppHttpSetup } from "@src/app-http.setup";
import PrismaService from "@src/databases/prisma/prisma.service";
import { GlobalServicesModule } from "@src/global-services.module";
import { AuthModule } from "@src/modules/auth/auth.module";
import { BaseConfigsSeeder } from "prisma/seeders/base-configs-seeder";
import { SeedFactory } from "prisma/utils/seed-factory";
import * as request from "supertest";

describe("auth module", () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        GlobalServicesModule,
        AuthModule,
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

  describe("Auth Controller v1", () => {
    const baseEndpoint = "/v1/auth/local";

    describe('POST: "/v1/auth/local"', () => {
      it("Should sign user in, returning access token and user account data", async () => {
        const input = {
          email: "admin@packshop.com",
          password: "admin",
        };

        const expected = expect.objectContaining({
          accessToken: expect.any(String),
          user: expect.any(Object),
        });

        const result = await request(app.getHttpServer())
          .post(baseEndpoint)
          .send(input);

        expect(result.status).toEqual(HttpStatus.CREATED);
        expect(result.body).toEqual(expected);
      });

      describe("Should throw UNAUTHORIZED when:", () => {
        it("Receives invalid credentials, returning error details", async () => {
          const input = {
            email: "e2e-test-invalid-email",
            password: "??",
          };

          const expected = expect.objectContaining({
            message: expect.any(String),
            statusCode: HttpStatus.UNAUTHORIZED,
          });

          const result = await request(app.getHttpServer())
            .post(baseEndpoint)
            .send(input);

          expect(result.status).toEqual(HttpStatus.UNAUTHORIZED);
          expect(result.body).toEqual(expected);
        });
      });
    });
  });
});
