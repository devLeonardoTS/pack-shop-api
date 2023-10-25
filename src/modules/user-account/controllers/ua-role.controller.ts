import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AccountRoleType } from "@prisma/client";
import { AccountRoleTypeService } from "@src/modules/types/account-role/account-role-type.service";

@Controller("user-account/:uaId/role")
export class UserAccountRoleTypeController {
  constructor(
    private readonly accountRoleTypeService: AccountRoleTypeService,
  ) {}

  @Get()
  async findByParentId(
    @Param("uaId", ParseIntPipe) uaId: number,
  ): Promise<AccountRoleType> {
    return this.accountRoleTypeService.findOne({
      filters: { userAccountId: uaId },
    });
  }
}
