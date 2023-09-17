import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";

export async function AppHttpSetup(app: INestApplication) {
  // Allow CORS
  app.enableCors();
  // Auto-validation setup.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // Versioning setup.
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });
}
