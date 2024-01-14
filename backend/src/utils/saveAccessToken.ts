import { database } from "../app";

export function saveAccessToken(access_token: string) {
  database.access_tokens.push(access_token);
}