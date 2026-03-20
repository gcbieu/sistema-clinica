<template>
  <div class="dashboard-container">
    <header class="header">
      <h2>Agendamento Inteligente</h2>
      <span v-if="user" class="user-badge">{{ user.cargo }}</span>
    </header>
    
    <section class="appointment-form">
      <h3>Novo Agendamento</h3>
      <form @submit.prevent="createAppointment">
        <input v-model="form.data" type="date" required />
        <input v-model="form.hora" type="time" required />
        <input 
          v-model="form.cep" 
          type="text" 
          placeholder="CEP (apenas números)" 
          @blur="searchCep" 
          maxlength="8" 
          required 
        />
        
        <div v-if="loadingCep" class="loading-text">Buscando endereço...</div>
        <input v-model="form.rua" type="text" placeholder="Rua" readonly class="readonly-input" />
        <input v-model="form.cidade" type="text" placeholder="Cidade" readonly class="readonly-input" />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Agendando...' : 'Confirmar Agendamento' }}
        </button>
      </form>
    </section>

    <hr />

    <section class="appointment-list">
      <h3>{{ isAdmin ? 'Painel Administrativo - Todos os Agendamentos' : 'Meus Agendamentos' }}</h3>
      <div v-if="appointments.length === 0" class="empty-msg">Nenhum agendamento encontrado.</div>
      <ul>
        <li v-for="app in appointments" :key="app._id" class="card">
          <div class="card-header">
            <p><strong>📅 Data:</strong> {{ app.data }} às {{ app.hora }}</p>
            <span v-if="isAdmin" class="patient-id">ID Paciente: {{ app.pacienteId }}</span>
          </div>
          <p><strong>📍 Endereço:</strong> {{ app.rua }}, {{ app.cidade }}</p>
          <p :class="['weather-alert', { 'rain-warning': app.previsaoClima.includes('Chuva') }]">
            ☁️ <strong>Clima Previsto:</strong> {{ app.previsaoClima }}
          </p>
        </li>
      </ul>
    </section>

    <button @click="logout" class="logout-btn">Sair do Sistema</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      loadingCep: false,
      user: JSON.parse(localStorage.getItem('user')),
      form: { data: '', hora: '', cep: '', rua: '', cidade: '' },
      appointments: []
    };
  },
  computed: {
    isAdmin() {
      return this.user && (this.user.cargo === 'secretario' || this.user.cargo === 'Admin');
    }
  },
  methods: {
    async searchCep() {
      if (this.form.cep.length === 8) {
        this.loadingCep = true;
        try {
          const res = await axios.get(`https://viacep.com.br/ws/${this.form.cep}/json/`);
          if (!res.data.erro) {
            this.form.rua = res.data.logradouro;
            this.form.cidade = res.data.localidade;
          } else {
            alert("CEP não encontrado.");
          }
        } catch (err) {
          console.error("Erro ao buscar CEP");
        } finally {
          this.loadingCep = false;
        }
      }
    },
    async createAppointment() {
      if (!this.user) return alert("Sessão expirada. Faça login novamente.");
      this.loading = true;
      try {
        const payload = {
          pacienteId: this.user.id,
          data: this.form.data,
          hora: this.form.hora,
          cep: this.form.cep,
          rua: this.form.rua,
          cidade: this.form.cidade
        };

        await axios.post('http://localhost:3000/api/appointments', payload);
        alert('Agendamento realizado com sucesso!');
        this.fetchAppointments();
        this.form = { data: '', hora: '', cep: '', rua: '', cidade: '' };
      } catch (err) {
        alert('Erro ao realizar agendamento.');
      } finally {
        this.loading = false;
      }
    },
    async fetchAppointments() {
      if (!this.user) return;
      try {
        // A rota do backend já filtra se é admin ou paciente pelo ID
        const res = await axios.get(`http://localhost:3000/api/appointments/${this.user.id}`);
        this.appointments = res.data;
      } catch (err) {
        console.error("Erro ao carregar lista de agendamentos");
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchAppointments();
  }
};
</script>

<style scoped>
.dashboard-container { max-width: 650px; margin: 20px auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.user-badge { background: #3498db; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; text-transform: uppercase; }
.appointment-form { background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); margin-bottom: 30px; }
input { display: block; width: 100%; margin: 12px 0; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
.readonly-input { background: #f9f9f9; color: #666; }
button { width: 100%; padding: 14px; background: #2ecc71; color: white; border: none; cursor: pointer; border-radius: 6px; font-weight: bold; font-size: 1rem; transition: background 0.3s; }
button:hover { background: #27ae60; }
button:disabled { background: #bdc3c7; }
.card { border-left: 5px solid #2ecc71; padding: 15px; margin: 15px 0; border-radius: 8px; list-style: none; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.card-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
.patient-id { font-size: 0.7rem; color: #999; }
.weather-alert { color: #34495e; font-size: 0.95rem; margin-top: 10px; padding: 8px; background: #f0f3f5; border-radius: 4px; }
.rain-warning { color: #e67e22; background: #fff5e6; font-weight: bold; border: 1px solid #ffe0b3; }
.loading-text { font-size: 0.8rem; color: #3498db; margin-top: -5px; }
.empty-msg { text-align: center; color: #95a5a6; margin-top: 20px; }
.logout-btn { background: #e74c3c; margin-top: 30px; }
.logout-btn:hover { background: #c0392b; }
</style>