export interface Auth {
  id: string
  userId: string
  provider: "local" | "google"

  refreshTokenVersion: number

  username?: string
  passwordHash?: string

  emailVerifiedAt?: Date
  lastLoginAt?: Date
  lastPasswordChangeAt?: Date

  createdAt: Date
}
