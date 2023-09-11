import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppHttpSetup } from "./utils/app-http.setup";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Basic App Setup
  await AppHttpSetup(app);
  // ---------------------

  // Enabled Shutdown Hoooks
  app.enableShutdownHooks();
  // -------------------

  await app.listen(3000);
}

bootstrap();
