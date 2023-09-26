import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("local")
  async signIn(@Request() req) {
    const response = {
      access_token: await this.authService.signIn(req.user),
      user: req.user,
    };
    return response;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get("profile")
  // async getProfile(@Request() req) {
  //   return req.user;
  // }
}
