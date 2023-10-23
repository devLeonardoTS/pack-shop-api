import { TokenType } from "@prisma/client";
import { ETokenType } from "@src/modules/types/token/token-type.enum";

export function createTokenTypes() {
  const objects: Omit<TokenType, "id" | "createdAt">[] = [];

  Object.values(ETokenType).forEach((type) => {
    objects.push({ type });
  });

  return objects;
}
