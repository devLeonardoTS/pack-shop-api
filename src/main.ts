import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./databases/prisma/prisma.service";
import { AppHttpSetup } from "./utils/app-http.setup";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Basic App Setup
  await AppHttpSetup(app);
  // ---------------------

  // Prisma server setup
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  // -------------------

  await app.listen(3000);
}

bootstrap();
