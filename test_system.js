const axios = require('axios');

async function testSystem() {
  const baseURL = 'http://localhost:4000';
  
  try {
    console.log('🧪 Testando sistema LavaJá...\n');
    
    // 1. Testar se o servidor está rodando
    console.log('1. Testando conexão com o servidor...');
    const healthResponse = await axios.get(`${baseURL}/`);
    console.log('✅ Servidor funcionando:', healthResponse.data.message);
    
    // 2. Criar um usuário de teste
    console.log('\n2. Criando usuário de teste...');
    const userData = {
      name: 'João Silva',
      email: 'joao@teste.com',
      password: 'Senha123'
    };
    
    try {
      const registerResponse = await axios.post(`${baseURL}/api/users/register`, userData);
      console.log('✅ Usuário criado:', registerResponse.data.data.name);
    } catch (error) {
      if (error.response?.data?.error === 'Email já cadastrado') {
        console.log('ℹ️ Usuário já existe, continuando...');
      } else {
        throw error;
      }
    }
    
    // 3. Testar login
    console.log('\n3. Testando login...');
    const loginData = {
      email: 'joao@teste.com',
      password: 'Senha123'
    };
    
    const loginResponse = await axios.post(`${baseURL}/api/auth/login`, loginData);
    console.log('✅ Login realizado com sucesso!');
    console.log('   Token:', loginResponse.data.data.token.substring(0, 20) + '...');
    console.log('   Usuário:', loginResponse.data.data.user.name);
    
    console.log('\n🎉 Sistema funcionando perfeitamente!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Acesse: http://localhost:5173');
    console.log('2. Faça login com: joao@teste.com / Senha123');
    console.log('3. Explore a aplicação!');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
    console.log('\n🔧 Soluções:');
    console.log('1. Verifique se o backend está rodando: npm run dev (na pasta backend)');
    console.log('2. Verifique se o frontend está rodando: npm run dev (na pasta frontend)');
    console.log('3. Verifique se as portas 4000 e 5173 estão livres');
  }
}

testSystem();
