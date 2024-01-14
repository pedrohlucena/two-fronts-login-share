import { database } from "../app";

export function cleanAccessTokens() {
  database.access_tokens.length = 0
}