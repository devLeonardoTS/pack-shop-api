import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config/dist";
import { PrismaClient } from "@prisma/client";

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

    // Get all prisma models...
    const models = Reflect.ownKeys(this).filter((key) => key[0] !== "_");

    // Clear all models (tables).
    models.map(async (modelKey) => {
      if (typeof this[modelKey].deleteMany === "function") {
        await this[modelKey].deleteMany({});
      }
    });
  }
}
