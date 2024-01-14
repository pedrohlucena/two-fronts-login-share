const { v4: uuid } = require('uuid');

export function generateAccessToken(): string {
  return uuid()
}