import { TokenType } from "@src/modules/token-type/entities/token-type.entity";

export function createTokenTypes() {
  const types: string[] = ["AUTHORIZATION"];

  const objects: Omit<TokenType, "id" | "createdAt">[] = [];

  types.forEach((type) => objects.push({ type }));

  return objects;
}
