<template>
  <div class="auth-container">
    <h2>Criar Conta - Clínica</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="form.nome" type="text" placeholder="Nome Completo" required />
      <input v-model="form.email" type="email" placeholder="E-mail" required />
      <input v-model="form.senha" type="password" placeholder="Senha" required />
      <select v-model="form.cargo">
        <option value="paciente">Paciente</option>
        <option value="secretario">Secretário</option>
      </select>
      <button type="submit">Cadastrar</button>
    </form>
    <p>Já tem conta? <router-link to="/">Faça Login</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: { nome: '', email: '', senha: '', cargo: 'paciente' }
    };
  },
  methods: {
    async handleRegister() {
      try {
        await axios.post('http://localhost:3000/api/auth/register', this.form);
        alert('Conta criada com sucesso!');
        this.$router.push('/'); // Volta para o login
      } catch (err) {
        alert('Erro ao cadastrar: ' + (err.response?.data?.msg || 'Erro no servidor'));
      }
    }
  }
};
</script>

<style scoped>
.auth-container { max-width: 400px; margin: 100px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center; }
input, select { display: block; width: 100%; margin: 10px 0; padding: 10px; box-sizing: border-box; }
button { width: 100%; padding: 12px; background-color: #3498db; color: white; border: none; cursor: pointer; font-weight: bold; }
</style>