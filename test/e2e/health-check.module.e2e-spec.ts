import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppHttpSetup } from "@src/app-http.setup";
import { HealthCheckModule } from "@src/modules/health-check/health-check.module";
import * as request from "supertest";

describe("health-check module", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();

    app = module.createNestApplication();

    await AppHttpSetup(app); // Set base configs for server start-up.
    await app.init();
  });

  describe("health-check controller v1", () => {
    const baseEndpoint = "/v1/health-check";

    describe('get: "/v1/health-check"', () => {
      it('should return Status 200 and "I\'m alive" as a message.', async () => {
        const expected = expect.objectContaining({
          message: expect.stringContaining("I'm alive"),
        });

        const result = await request(app.getHttpServer()).get(baseEndpoint);

        expect(result.status).toEqual(HttpStatus.OK);
        expect(result.body).toEqual(expected);
      });
    });
  });
});
