import { FileTypeValidator, ParseFilePipe } from "@nestjs/common";

export class RequiredImageParseFilePipe extends ParseFilePipe {
  constructor() {
    super({
      validators: [
        new FileTypeValidator({
          fileType:
            "^image/(jpeg|png|gif|bmp|webp|tiff|svg+xml|x-icon|x-ms-bmp|x-png|pjpeg|jpg|pjp|svg)$",
        }),
      ],
    });
  }
}

export class OptionalImageParseFilePipe extends ParseFilePipe {
  constructor() {
    super({
      fileIsRequired: false,
      validators: [
        new FileTypeValidator({
          fileType:
            "^image/(jpeg|png|gif|bmp|webp|tiff|svg+xml|x-icon|x-ms-bmp|x-png|pjpeg|jpg|pjp|svg)$",
        }),
      ],
    });
  }
}
