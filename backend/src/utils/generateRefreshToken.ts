const { v4: uuid } = require('uuid');

export function generateRefreshToken(): string {
  return uuid()
}