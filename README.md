# 🏥 **Sistema de Clínica Inteligente **

## 🚀 **1. Guia de Instalação e Execução**

Para garantir um arquivo leve, as pastas de dependências (`node_modules`) foram removidas. Siga os passos abaixo para preparar o ambiente:

### ⚙️ **Passo A: Configurando o Backend (Servidor)**
1. Abra um terminal na pasta `/backend`.
2. Instale as dependências:
   ```bash
   npm install
Inicie o servidor:Bashnode src/server.js
📍 O servidor backend rodará em: http://localhost:3000💻 

### ⚙️ **Passo B: Configurando o Frontend (Interface)
Abra um segundo terminal na pasta cd frontend.
Instale as dependências: npm install
Inicie a aplicação: npm run dev
📍 Acesse o sistema pelo navegador em: http://localhost:5173🛠️ 

2. Funcionalidades e Requisitos Atendidos

🔐Autenticação JWT: Registro e Login seguro com senhas criptografadas via BCrypt e proteção de rotas por Token.
📍 Integração ViaCEP: Preenchimento automático de logradouro e cidade assim que o CEP é digitado.
☁️ Inteligência Climática (HG Brasil): Consulta em tempo real. O sistema exibe um Alerta de Chuva automático no card caso haja previsão de precipitação para o dia da consulta.
👨‍⚕️ Painel Administrativo: Filtro de acesso inteligente por cargo.Secretário: Visualiza a lista completa de agendamentos da clínica.Paciente: Visualiza apenas seus próprios horários agendados.
🗄️ Banco de Dados: Persistência robusta de dados utilizando MongoDB.

3. Arquitetura do Sistema

🌐 Backend (Node.js + Express): Orquestrador das regras de negócio, conexão com o banco de dados e ponte para as APIs de Clima e CEP.
🎨 Frontend (Vue.js 3 + Vite): Interface reativa, moderna e otimizada para uma experiência de usuário fluida.

5. Stack Tecnológica

🌐 Tecnologia       Descrição
Linguagens          JavaScript (Node.js / Vue.js)
Banco de Dados      MongoDB (Mongoose)
APIs Externas       ViaCEP (Endereço) e HG Brasil (Clima)
Bibliotecas         Axios, JSON Web Token (JWT), BCrypt



👨‍💻 Desenvolvedor: Gabriel Costa de Oliveira 
📍 Universidade Veiga de Almeida (UVA) 
📅 Ano: 2026