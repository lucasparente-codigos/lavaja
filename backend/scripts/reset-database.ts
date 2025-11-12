// backend/scripts/reset-database.ts
import fs from 'fs';
import path from 'path';
import { openDb } from '../src/database';

async function resetDatabase() {
  const dbPath = path.resolve(__dirname, '..', 'data', 'dev.db');
  
  console.log('🔄 Resetando banco de dados...\n');
  
  try {
    // 1. Deletar arquivo se existir
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log('✅ Banco de dados antigo deletado');
    } else {
      console.log('ℹ️  Nenhum banco existente encontrado');
    }
    
    // 2. Criar novo banco
    console.log('📦 Criando novo banco de dados...');
    await openDb();
    console.log('✅ Banco de dados criado com sucesso!');
    
    // 3. Verificar tabelas criadas
    const db = await openDb();
    const tables = await db.all(`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      ORDER BY name;
    `);
    
    console.log('\n✅ Tabelas criadas:');
    tables.forEach(table => {
      console.log(`   - ${table.name}`);
    });
    
    console.log('\n🎉 Reset concluído com sucesso!\n');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Erro ao resetar banco:', error);
    process.exit(1);
  }
}

resetDatabase();