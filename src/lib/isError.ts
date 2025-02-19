import type { ShortenError } from "./types/serverResponses";

export function isError(obj: unknown): obj is ShortenError {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "error" in obj &&
    typeof obj.error === "string" &&
    "message" in obj &&
    Array.isArray(obj.message) &&
    "statusCode" in obj &&
    typeof obj.statusCode === "number"
  );
}
