import { TokenType } from "@src/modules/token-type/entities/token-type.entity";
import { ETokenType } from "@src/modules/token-type/enums/token-type.enum";

export function createTokenTypes() {
  const objects: Omit<TokenType, "id" | "createdAt">[] = [];

  Object.values(ETokenType).forEach((type) => {
    objects.push({ type });
  });

  return objects;
}
