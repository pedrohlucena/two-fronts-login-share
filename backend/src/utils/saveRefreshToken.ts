import { database } from "../app";

export function saveRefreshToken(refresh_token: string) {
  database.refresh_tokens.push(refresh_token);
}