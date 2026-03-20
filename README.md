Sistema de Atendimento Inteligente - Clínica Médica 🏥

Projeto consiste em uma plataforma Full Stack para agendamento de consultas com integrações inteligentes.

🚀 Como Executar o Projeto

Passo A: Configurando o Backend (Servidor)

Abra um terminal na pasta /backend.

Instale as dependências:
```bash
npm install


Inicie o servidor:
```bash
node src/server.js


🌐 O servidor backend rodará em: http://localhost:3000

Passo B: Configurando o Frontend (Interface)

Abra um segundo terminal na pasta /frontend.

Instale as dependências:
```bash
npm install

Inicie a aplicação:
```bash
npm run dev

🖱️ Acesse o sistema pelo navegador no link indicado pelo terminal (geralmente http://localhost:5173).

🛠️ Tecnologias Utilizadas

Frontend: Vue.js 3 (Vite), Axios, Tailwind CSS.

Backend: Node.js, Express.

Banco de Dados: MongoDB.

Segurança: Autenticação JWT e Criptografia BCrypt.

APIs Externas: ViaCEP (Endereço) e HG Brasil Weather (Clima).

🔐 Funcionalidades e Requisitos Atendidos

Autenticação JWT: Registro e Login seguro com senhas criptografadas.

Proteção de Rotas: Acesso restrito a usuários autenticados.

Integração ViaCEP: Preenchimento automático de logradouro e cidade através do CEP.

Inteligência Climática (HG Brasil): O sistema exibe um Alerta de Chuva automático nos agendamentos caso haja previsão de precipitação para o dia.

Painel Administrativo: - Paciente: Visualiza apenas seus próprios agendamentos.

Secretário: Possui visão global de todos os agendamentos para gestão de horários e disponibilidade.

Banco de Dados: Persistência robusta de dados utilizando MongoDB.

👨‍💻 Desenvolvedor

Nome: Gabriel Costa de Oliveira

Ano: 2026