import { getDb } from '../database';

import { BaseAccount } from './User'; // Reutiliza a interface base

export interface Company extends BaseAccount {
  cnpj: string;
}

export interface CompanyWithPassword extends Company {
  password: string;
}

export class CompanyModel {
  static async findByEmail(email: string): Promise<Company | undefined> {
    const db = await getDb();
    return db.get<Company>('SELECT id, name, email, cnpj, phoneNumber, createdAt FROM Company WHERE email = ?', email);
  }

  static async findByEmailWithPassword(email: string): Promise<CompanyWithPassword | undefined> {
    const db = await getDb();
    return db.get<CompanyWithPassword>('SELECT * FROM Company WHERE email = ?', email);
  }

  static async findByCnpj(cnpj: string): Promise<Company | undefined> {
    const db = await getDb();
    return db.get<Company>('SELECT * FROM Company WHERE cnpj = ?', cnpj);
  }

  static async create(data: Omit<CompanyWithPassword, 'id' | 'createdAt'>): Promise<CompanyWithPassword> {
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO Company (name, email, cnpj, password, phoneNumber) VALUES (?, ?, ?, ?, ?)',
      data.name,
      data.email,
      data.cnpj,
      data.password,
      data.phoneNumber
    );

    const newCompany = await db.get<CompanyWithPassword>('SELECT * FROM Company WHERE id = ?', result.lastID);

    if (!newCompany) {
      throw new Error('Falha ao criar empresa');
    }

    return newCompany;
  }

  static async findById(id: number): Promise<Company | undefined> {
    const db = await getDb();
    return db.get<Company>('SELECT id, name, email, cnpj, phoneNumber, createdAt FROM Company WHERE id = ?', id);
  }

  static async findAll(): Promise<Company[]> {
    const db = await getDb();
    return db.all<Company[]>('SELECT id, name, email, cnpj, phoneNumber, createdAt FROM Company');
  }

  static async delete(id: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.run('DELETE FROM Company WHERE id = ?', id);
    return result.changes === 1;
  }

  static async update(id: number, data: Partial<Omit<CompanyWithPassword, 'id' | 'createdAt' | 'email' | 'cnpj'>>): Promise<Company | undefined> {
    const db = await getDb();
    
    const fields = Object.keys(data);
    const values = Object.values(data);

    if (fields.length === 0) {
      return this.findById(id);
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');

    const result = await db.run(`UPDATE Company SET ${setClause} WHERE id = ?`, [...values, id]);

    if ((result.changes ?? 0) === 0) {
      return undefined;
    }

    return this.findById(id);
  }
}