import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { GlobalServicesModule } from "./global-services.module";
import { LeadsModule } from "./modules/leads/leads.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GlobalServicesModule,
    LeadsModule,
  ],
})
export class AppModule {}
