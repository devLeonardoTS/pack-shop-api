import { Controller, Get } from "@nestjs/common";

@Controller("health-check")
export class HealthCheckControllerV1 {
  @Get()
  async healthCheck(): Promise<{ message: string }> {
    return { message: "I'm alive" };
  }
}
