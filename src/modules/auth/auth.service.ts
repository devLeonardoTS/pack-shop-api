import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserAccount } from "../user-account/entities/user-account.entity";
import { UserAccountService } from "../user-account/services/user-account.service";
import { JwtValidatePayload } from "./jwt.strategy";

@Injectable()
export class AuthService {
  constructor(
    private readonly userAccountService: UserAccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let userAccount: UserAccount;
    try {
      userAccount = await this.userAccountService.findByEmail(email);
    } catch {}

    if (!password || !userAccount?.password) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userAccount.password,
    );

    if (!isPasswordCorrect) {
      return null;
    }

    delete userAccount.password;

    return userAccount;
  }

  async signIn(userAccount: Omit<UserAccount, "password">) {
    const payload: JwtValidatePayload = {
      email: userAccount.email,
      role: userAccount.roleTypeId,
      sub: userAccount.id,
    };
    return this.jwtService.sign(payload);
  }
}
