import { Module } from "@nestjs/common";
import { LeadsControllerV1 } from "./controllers/leads.controller";
import { ILeadsRepository } from "./interfaces/leads-repository.interface";
import { PrismaLeadsRepository } from "./repositories/prisma-leads.repository";
import { LeadsService } from "./services/leads.service";

@Module({
  controllers: [LeadsControllerV1],
  providers: [
    LeadsService,
    {
      provide: ILeadsRepository,
      useClass: PrismaLeadsRepository,
    },
  ],
})
export class LeadsModule {}
