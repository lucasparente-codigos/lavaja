import { getDb } from '../database';

export interface Company {
  id: number;
  name: string;
  email: string;
  cnpj: string;
  password: string;
  createdAt: string;
}

export class CompanyModel {
  static async findByEmail(email: string): Promise<Company | undefined> {
    const db = await getDb();
    return db.get<Company>('SELECT * FROM Company WHERE email = ?', email);
  }

  static async findByCnpj(cnpj: string): Promise<Company | undefined> {
    const db = await getDb();
    return db.get<Company>('SELECT * FROM Company WHERE cnpj = ?', cnpj);
  }

  static async create(data: Omit<Company, 'id' | 'createdAt'>): Promise<Company> {
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO Company (name, email, cnpj, password) VALUES (?, ?, ?, ?)',
      data.name,
      data.email,
      data.cnpj,
      data.password
    );

    const newCompany = await db.get<Company>('SELECT * FROM Company WHERE id = ?', result.lastID);

    if (!newCompany) {
      throw new Error('Falha ao criar empresa');
    }

    return newCompany;
  }

  static async findById(id: number): Promise<Company | undefined> {
    const db = await getDb();
    return db.get<Company>('SELECT * FROM Company WHERE id = ?', id);
  }
}