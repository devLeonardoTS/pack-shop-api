import { NestFactory } from "@nestjs/core";
import { AppHttpSetup } from "./app-http.setup";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Basic App Setup
  await AppHttpSetup(app);
  // ---------------------

  // Enabled Shutdown Hoooks
  app.enableShutdownHooks();
  // -------------------

  await app.listen(process.env.PORT);
}

bootstrap();
