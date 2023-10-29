import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { AccountRoleType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { AccountRoleTypeService } from "@src/modules/types/account-role/account-role-type.service";

@Controller("user-account/:uaId/role")
export class UserAccountRoleTypeController {
  constructor(private readonly userAccountService: AccountRoleTypeService) {}

  @Get()
  async findByParentId(
    @Param("uaId", ParseIntPipe) uaId: number,
    @Query() query: CommonQuery<AccountRoleType>,
  ): Promise<AccountRoleType> {
    query.filters = { ...query.filters, accounts: { every: { id: uaId } } };
    return await this.userAccountService.findOne(query);
  }
}
