import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AccountOriginType } from "@prisma/client";
import { AccountOriginTypeService } from "@src/modules/types/account-origin/account-origin-type.service";

@Controller("user-account/:uaId/origin")
export class UserAccountOriginTypeController {
  constructor(
    private readonly accountOriginTypeService: AccountOriginTypeService,
  ) {}

  @Get()
  async findByParentId(
    @Param("uaId", ParseIntPipe) uaId: number,
  ): Promise<AccountOriginType> {
    return this.accountOriginTypeService.findOne({
      filters: { userAccountId: uaId },
    });
  }
}
