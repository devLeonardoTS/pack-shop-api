import { Module } from "@nestjs/common";
import { HealthCheckControllerV1 } from "./controllers/health-check.controller";

@Module({
  controllers: [HealthCheckControllerV1],
})
export class HealthCheckModule {}
