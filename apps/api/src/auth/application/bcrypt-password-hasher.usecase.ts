import bcrypt from "bcrypt"
import type { PasswordHasherPort } from "@/auth/domain/password-hasher.port.js"

export class BcryptPasswordHasher implements PasswordHasherPort {
	private readonly saltRounds = 12

	async hash( password: string ): Promise<string> {
		return bcrypt.hash( password, this.saltRounds )
	}

	async compare( password: string, hash: string ): Promise<boolean> {
		return bcrypt.compare( password, hash )
	}
}
