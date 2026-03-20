<template>
  <div class="login-container">
    <h2>Login - Clínica Inteligente</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="senha" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p>Não tem conta? <router-link to="/register">Cadastre-se</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { email: '', senha: '' };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          senha: this.senha
        });
        
        // SALVA O TOKEN E O USUÁRIO (ESSENCIAL!)
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user)); 
        
        alert('Login realizado!');
        this.$router.push('/dashboard');
      } catch (err) {
        const msg = err.response ? err.response.data.msg : "Erro no servidor";
        alert('Erro ao logar: ' + msg);
      }
    }
  }
};
</script>

<style scoped>
.login-container { max-width: 300px; margin: 50px auto; text-align: center; font-family: sans-serif; }
input { display: block; width: 100%; margin: 10px 0; padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
button { width: 100%; padding: 10px; background: #2ecc71; color: white; border: none; cursor: pointer; border-radius: 4px; }
</style>