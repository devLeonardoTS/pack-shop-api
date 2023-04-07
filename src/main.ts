import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./databases/prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prisma server setup
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  // -------------------

  // Auto-validation setup
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // ---------------------

  await app.listen(3000);
}

bootstrap();
