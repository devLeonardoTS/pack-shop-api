import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { GlobalServicesModule } from "./global-services.module";
import { AccountOriginTypeModule } from "./modules/account-origin-type/account-origin-type.module";
import { AccountRoleTypeModule } from "./modules/account-role-type/account-role-type.module";
import { AuthModule } from "./modules/auth/auth.module";
import { BusinessTypeModule } from "./modules/business-type/business-type.module";
import { HealthCheckModule } from "./modules/health-check/health-check.module";
import { ImageTypeModule } from "./modules/image-type/image-type.module";
import { ImageModule } from "./modules/image/image.module";
import { LeadsModule } from "./modules/leads/leads.module";
import { ProductModule } from "./modules/product/product.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { TokenTypeModule } from "./modules/token-type/token-type.module";
import { UploadModule } from "./modules/upload/upload.module";
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
    ImageModule,
    ImageTypeModule,
    UploadModule,
    ProfileModule,
    BusinessTypeModule,
    ProductModule,
  ],
})
export class AppModule {}
