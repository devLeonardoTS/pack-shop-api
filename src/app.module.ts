import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { GlobalServicesModule } from "./global-services.module";
import { HealthCheckModule } from "./modules/health-check/health-check.module";
import { LeadsModule } from "./modules/leads/leads.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GlobalServicesModule,
    LeadsModule,
    HealthCheckModule,
  ],
})
export class AppModule {}
