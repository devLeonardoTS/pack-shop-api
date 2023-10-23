import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config/dist";
import { GlobalServicesModule } from "./global-services.module";
import { AuthModule } from "./modules/auth/auth.module";
import { QueryParserMiddleware } from "./modules/common/middlewares/query-parser.middleware";
import { HealthCheckModule } from "./modules/health-check/health-check.module";
import { ImageTypeModule } from "./modules/image-type/image-type.module";
import { ImageModule } from "./modules/image/image.module";
import { LeadsModule } from "./modules/leads/leads.module";
import { ProductModule } from "./modules/product/product.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { TokenTypeModule } from "./modules/token-type/token-type.module";
import { AccountOriginTypeModule } from "./modules/types/account-origin/account-origin-type.module";
import { AccountRoleTypeModule } from "./modules/types/account-role/account-role-type.module";
import { BusinessTypeModule } from "./modules/types/business/business-type.module";
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(QueryParserMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.GET });
  }
}
