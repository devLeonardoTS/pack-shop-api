import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { AccountOriginType } from "@prisma/client";
import { CommonQuery } from "@src/modules/common/dtos/common.query";
import { AccountOriginTypeService } from "@src/modules/types/account-origin/account-origin-type.service";

@Controller("user-account/:uaId/origin")
export class UserAccountOriginTypeController {
  constructor(
    private readonly accountOriginTypeService: AccountOriginTypeService,
  ) {}

  @Get()
  async findByParentId(
    @Param("uaId", ParseIntPipe) uaId: number,
    @Query() query: CommonQuery<AccountOriginType>,
  ): Promise<AccountOriginType> {
    query.filters = { ...query.filters, accounts: { every: { id: uaId } } };
    return this.accountOriginTypeService.findOne(query);
  }
}
