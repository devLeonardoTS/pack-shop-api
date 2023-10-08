import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { GlobalServicesModule } from "./global-services.module";
import { AccountOriginTypeModule } from "./modules/account-origin-type/account-origin-type.module";
import { AccountRoleTypeModule } from "./modules/account-role-type/account-role-type.module";
import { AuthModule } from "./modules/auth/auth.module";
import { BusinessProfileModule } from "./modules/business-profile/business-profile.module";
import { HealthCheckModule } from "./modules/health-check/health-check.module";
import { LeadsModule } from "./modules/leads/leads.module";
import { TokenTypeModule } from "./modules/token-type/token-type.module";
import { UserAccountModule } from "./modules/user-account/user-account.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GlobalServicesModule,
    LeadsModule,
    HealthCheckModule,
    AccountOriginTypeModule,
    AccountRoleTypeModule,
    UserAccountModule,
    TokenTypeModule,
    AuthModule,
    BusinessProfileModule,
  ],
})
export class AppModule {}
