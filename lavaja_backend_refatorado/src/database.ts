import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = path.resolve(__dirname, '..', 'prisma', 'dev.db');

export async function openDb() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Criação das tabelas se não existirem
  await db.exec(`
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Company (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      cnpj TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}

// Exporta uma instância única do banco de dados
let dbInstance: Awaited<ReturnType<typeof openDb>>;

export async function getDb() {
  if (!dbInstance) {
    dbInstance = await openDb();
  }
  return dbInstance;
}
