// backend/scripts/reset-database.ts
import { promises as fs } from 'fs';
import path from 'path';
import { openDb } from '../src/database';

async function resetDatabase() {
  // Medida de segurança: impede a execução fora do ambiente de desenvolvimento
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Este script não pode ser executado em ambiente de produção.');
    process.exit(1);
  }

  const dbPath = path.resolve(__dirname, '..', 'data', 'dev.db');
  
  console.log('🔄 Resetando banco de dados de desenvolvimento...\n');
  
  try {
    // 1. Deleta o arquivo de banco de dados existente de forma assíncrona
    try {
      await fs.unlink(dbPath);
      console.log('✅ Banco de dados antigo deletado.');
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.log('ℹ️  Nenhum banco de dados existente para deletar.');
      } else {
        throw error; // Lança outros erros inesperados
      }
    }
    
    // 2. Cria um novo banco e obtém as tabelas
    console.log('📦 Criando novo banco de dados e tabelas...');
    const db = await openDb(); // openDb já cria e migra
    console.log('✅ Banco de dados criado com sucesso!');
    
    // 3. Verifica as tabelas criadas
    const tables = await db.all(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name;
    `);
    
    console.log('\n✅ Tabelas disponíveis:');
    tables.forEach(table => {
      console.log(`   - ${table.name}`);
    });
    
    console.log('\n🎉 Reset concluído com sucesso!\n');
    
  } catch (error) {
    console.error('❌ Erro ao resetar o banco de dados:', error);
    process.exit(1);
  }
}

resetDatabase().finally(() => {
  // Encerra o processo de forma limpa
  process.exit(0);
});