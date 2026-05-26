import { sql } from '../../db';
import type { TRUser, TUsers } from '../../types';
import bcrypt from 'bcrypt';

class AuthServices {
  // CreateUser
  async createUser(user: TRUser & { password: string }) {
    const { name, email, age, role, password } = user;

    // PasswordHash
    const password_hash = await bcrypt.hash(password, 10);

    const res = await sql`
      INSERT INTO users (name, email, password_hash, age, role)
      VALUES (${name}, ${email}, ${password_hash}, ${age}, COALESCE(${role}, 'user'))
      RETURNING id, name, age, role
    `;
    return res[0];
  }

  // ValidateUser
  async validateUser(email: string, password: string) {
    const res = await sql`
      SELECT * FROM users WHERE email = ${email} 
    `;

    if (!res.length) {
      return null;
    }

    const { password_hash, ...user } = res[0] as TUsers;

    const isValid = await bcrypt.compare(password, password_hash);

    return isValid ? user : null;
  }
}

export default new AuthServices();
