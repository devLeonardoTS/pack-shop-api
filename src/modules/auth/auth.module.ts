import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt/dist";
import { PassportModule } from "@nestjs/passport";
import { UserAccountModule } from "../user-account/user-account.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    UserAccountModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "30d" },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
