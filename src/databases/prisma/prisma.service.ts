import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
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

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await this.onModuleDestroy();
      await app.close();
    });
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
        `TRUNCATE TABLE "${String(table)}" RESTART IDENTITY;`,
      );
    });
  }
}
