import { sql } from '../../db';
import type { TReturnUser } from '../../types';
import bcrypt from 'bcrypt';

class AuthService {
  async createUser(user: TReturnUser & { password: string }) {
    const { name, email, age, role, password } = user;

    const hashPassword = await bcrypt.hash(password, 10);

    const res = await sql`
      INSERT INTO users (name, email, passwordHash, age, role)
      VALUES (${name}, ${email}, ${hashPassword}, ${age}, COALESCE(${role}, 'user'))
      RETURNING id, name, age, role
    `;
    return res[0];
  }

  async validateUser(email: string, password: string) {
    const res = await sql`
    SELECT * FROM users WHERE email = ${email}
    `;
    if (!res.length) {
      return null;
    }
  }
}

export default new AuthService();
