import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserAccountService } from "../user-account/user-account.service";
import { jwtConstants } from "./constants";

export class JwtValidatePayload {
  email: string;
  role: number;
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userAccountService: UserAccountService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtValidatePayload) {
    const user = await this.userAccountService.findOne({
      filters: { email: payload.email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
