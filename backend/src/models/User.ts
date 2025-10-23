import { getDb } from '../database';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | undefined> {
    const db = await getDb();
    return db.get<User>('SELECT * FROM User WHERE email = ?', email);
  }

  static async create(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO User (name, email, password) VALUES (?, ?, ?)',
      data.name,
      data.email,
      data.password
    );

    const newUser = await db.get<User>('SELECT * FROM User WHERE id = ?', result.lastID);

    if (!newUser) {
      throw new Error('Falha ao criar usuário');
    }

    return newUser;
  }

  static async findById(id: number): Promise<User | undefined> {
    const db = await getDb();
    return db.get<User>('SELECT * FROM User WHERE id = ?', id);
  }
}
