import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import { Prisma, PrismaClient } from "@prisma/client";
import { BaseConfigsSeeder } from "prisma/seeders/base-configs-seeder";
import { LeadSeeder } from "prisma/seeders/lead-seeder";
import { SeedFactory } from "prisma/utils/seed-factory";

@Injectable()
export default class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions>
  implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  constructor(private readonly config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get("DATABASE_URL"),
        },
      },
    });
  }

  async onApplicationShutdown(signal?: string) {
    await this.onModuleDestroy();
  }

  async onModuleInit() {
    await this.$connect();

    // Runs all the data seeding necessary to run the system on a new database;
    await SeedFactory(this, [LeadSeeder, BaseConfigsSeeder]);
    // ----
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async clearDb() {
    // If not in production mode...
    if (this.config.get("NODE_ENV") === "production") {
      return;
    }

    // Get all tables derived from our prisma models...
    const modelKeys = Prisma.dmmf.datamodel.models.map((model) => model.name);

    // Clear all models and restart identity.
    modelKeys.map(async (table) => {
      await this.$executeRawUnsafe(
        `TRUNCATE TABLE "${String(table)}" RESTART IDENTITY CASCADE;`,
      );
    });
  }
}
