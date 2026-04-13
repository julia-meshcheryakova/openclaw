import { Type } from "@sinclair/typebox";

export function createTelegramPollExtraToolSchemas() {
  return {
    pollDurationSeconds: Type.Optional(Type.Number()),
    pollAnonymous: Type.Optional(Type.Boolean()),
    pollPublic: Type.Optional(Type.Boolean()),
  };
}

export function createTelegramMediaGroupExtraToolSchemas() {
  return {
    filePaths: Type.Optional(
      Type.Array(Type.String(), {
        description:
          "Array of file paths for media group (album). Min 1, max 10 items. Caption goes on first item only.",
        minItems: 1,
        maxItems: 10,
      }),
    ),
  };
}
